---
title: Choosing a model
description: Add a model from the list, run it as Custom, or bring your own worker or Civitai link.
---

Open **Models**. There are three ways to get a model, under **Add a model**.

| | Add | Custom | Your own worker |
|---|---|---|---|
| What runs it | RunPod's own worker | your copy of a Cobalt Pear worker | your copy of a Cobalt Pear worker, or any worker you made |
| LoRAs | no | yes | yes (Cobalt Pear workers) |
| Setup | fewest steps | copy the worker on GitHub, then make the endpoint | copy the worker on GitHub, then make the endpoint |
| Works for | every model in the list | list models with a single-file checkpoint | Civitai links, worker repos, pack or workflow files |

**In short:** just want pictures → **Add**. Want LoRAs on a list model → **Custom**. The model is on Civitai → paste its link under **Your own worker**.

## The list

- The list is RunPod's own: Hugging Face models, most downloaded first, kept if RunPod's worker can run them. New models come in and dropped ones go by themselves; models you already added stay.
- Tabs sort them by kind — text to picture, picture to picture, video and so on.
- Each model's note says how big a GPU it needs.
- **NSFW** means the model is marked not-for-all-audiences on Hugging Face.
- **Gated** means you must accept the model's terms on Hugging Face first, and the worker needs your Hugging Face token.
- If Hugging Face can't be reached, the fixed Cobalt Pear list shows instead.

## Add

Press **Add**, do the RunPod steps the app shows, then paste the endpoint ID.

Models added this way take a prompt, size and seed. They show **No LoRA on this worker**.

## Custom

**Custom** runs a list model on your own copy of the *Universal* worker for its family (SDXL, FLUX.1 or Z-Image), so LoRAs work there.
It counts as your own worker.

The button shows only on models that have a **single-file checkpoint** on Hugging Face.
Models stored only as diffusers folders can't go on a worker copy — use **Add** for those.

## Your own worker

Paste into **Your own worker**:

- **A Civitai model link** — an SDXL, Pony, Illustrious, NoobAI, FLUX.1, Chroma, Z-Image or SD 1.5 checkpoint.
  Copy it from the address bar on the model's page. Click a version there first to get the `?modelVersionId=…` part; without it you get the newest version.
  The settings come from Civitai, and you get a ready worker to copy.
- **A worker repo URL** — a worker with a `pack.json`.

Or choose a pack or ComfyUI workflow `.json` file.

The workers and the services each runs on: [Workers](../workers/).

Then follow [Set up](../setup/) to make the endpoint. Made your own worker? [Make a pack](../make-a-pack/) for it.

## Setting up your copy

After **Custom** or a Civitai link, the app lists the steps for that model. What each one is for:

1. **Make your copy** — a private copy of the worker on your GitHub, so RunPod can build it for you.
2. **Make a token** — the worker downloads the model with it.
   - *Civitai:* Civitai shows a token only once, so keep it somewhere. One token works for every model — next time reuse it and skip this step.
   - *Hugging Face, Gated models only:* press **Agree** on the model's page first, signed in. A **Read** token is enough, and one works for every model.
   - A Hugging Face model that isn't Gated needs no token: the step is **Add the model** instead.
3. **Add your token / Add the model** — the link opens a new file, `civitai.env`, in your copy with the model filled in. Paste the token after `CIVITAI_TOKEN=` or `HF_TOKEN=`, then press **Commit changes** in the page and again in the box that opens. Type your GitHub name in the box above the steps first, so the link knows where your copy is.
4. **Make the endpoint on RunPod** from your copy, with the GPU and disk the app shows ([where each setting is](../setup/#create-the-endpoint)). Then paste the endpoint ID next to the model.

| Family | GPU | Container disk | First build |
|---|---|---|---|
| SDXL, Pony, Illustrious, NoobAI | 16 GB | 20 GB | about 15 minutes |
| SD 1.5 | 16 GB | 20 GB | about 10 minutes |
| FLUX.1, Chroma, Z-Image | 24 GB | 40 GB | about 25 minutes |

The first picture after the build can take a few minutes more (up to about 12) while the worker starts. After that, a worker that has been idle starts again in a minute or two.
