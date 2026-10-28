// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// DOCS_BASE lets a preview build live under another path; the site itself is cobaltpear.github.io/docs
export default defineConfig({
	site: 'https://cobaltpear.github.io',
	base: process.env.DOCS_BASE || '/docs',
	integrations: [
		starlight({
			title: 'Cobalt Pear',
			description: 'How to use Cobalt Pear, the prompt page for your own image generation endpoint.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cobaltpear' }],
			sidebar: [
				{ label: 'Set up', slug: 'setup' },
				{ label: 'Using Cobalt Pear', items: [{ label: 'Choosing a model', slug: 'models' }, { label: 'LoRAs', slug: 'loras' }, { label: 'Make a pack', slug: 'make-a-pack' }, { label: 'Cost and speed', slug: 'cost-and-speed' }] },
				// what changed, newest first — tools/bump.sh in comfyui-serverless adds a line each release
				{ label: 'News', slug: 'news' },
			],
		}),
	],
});
