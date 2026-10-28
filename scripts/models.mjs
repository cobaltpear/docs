// Writes the models page from the worker repos of one GitHub organization — every repo with a pack.json.
// Run before each build (npm run build), so a new repo shows up by itself. If GitHub can't be read, the page stays as it was.
//   node scripts/models.mjs <org> <page.md> "<title>" "<description>"
import fs from 'node:fs';

const [org, out, title, description] = process.argv.slice(2);
const raw = (repo, path) => `https://raw.githubusercontent.com/${org}/${repo}/HEAD/${path}`;
const get = async (url, json) => {
	const r = await fetch(url, { headers: process.env.GITHUB_TOKEN && url.includes('api.github.com') ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {} });
	if (r.status === 404) return null;
	if (!r.ok) throw new Error(`${url}: ${r.status}`);
	return json ? r.json() : r.text();
};

try {
	const repos = (await get(`https://api.github.com/orgs/${org}/repos?per_page=100&type=public`, true))
		.filter(r => !r.archived && !r.name.startsWith('.')).map(r => r.name).sort();
	// the organization profile's «### Group» headings decide the groups, in its order
	const profile = (await get(raw('.github', 'profile/README.md'))) || '';
	const groupOf = {}, order = [];
	let g = '';
	for (const line of profile.split('\n')) {
		const h = line.match(/^###\s+(.+)/);
		if (h) { g = h[1].trim(); order.push(g); continue; }
		for (const m of line.matchAll(new RegExp(`github\\.com/${org}/([\\w.-]+)`, 'g'))) if (g) groupOf[m[1]] ??= g;
	}
	const rows = [];
	for (const repo of repos) {
		const pack = await get(raw(repo, 'pack.json'), true).catch(() => null);
		if (!pack) continue;
		const readme = (await get(raw(repo, 'README.md'))) || '';
		const gb = [...((readme.match(/\*\*GPU configuration\*\*[^\n]*/) || [''])[0].matchAll(/(\d+) GB/g))].map(m => +m[1]);
		const modal = (await get(raw(repo, 'modal_app.py'))) !== null;
		const url = `https://github.com/${org}/${repo}`;
		const on = [`[RunPod](${url}#create-the-endpoint)`, modal && `[Modal](${url}#or-run-it-on-modal)`].filter(Boolean).join(' · ');
		rows.push({ group: groupOf[repo] || 'Workers', line: `| [${pack.label || repo}](${url}) | ${pack.kind || ''} | ${pack.engine === 'json' ? 'AUTOMATIC1111' : 'ComfyUI'} | ${gb.length ? Math.min(...gb) + ' GB' : ''} | ${on} |` });
	}
	if (!rows.length) throw new Error('no worker repos found');
	const groups = [...order.filter(g => rows.some(r => r.group === g)), ...new Set(rows.map(r => r.group).filter(g => !order.includes(g)))];
	const body = groups.map(g => `${groups.length > 1 ? `## ${g}\n\n` : ''}| Model | Kind | Engine | GPU | Runs on |\n|---|---|---|---|---|\n${rows.filter(r => r.group === g).map(r => r.line).join('\n')}`).join('\n\n');
	fs.writeFileSync(out, `---\ntitle: ${title}\ndescription: ${description}\n---\n\n` +
		`Made from the worker repos on GitHub — the list follows them by itself. **Runs on** opens that repo's setup for each service; the GPU is the smallest one that fits.\n\n${body}\n`);
	console.log(`${out}: ${rows.length} models`);
} catch (e) {
	console.warn(`models page kept as it was — ${e.message}`);
}
