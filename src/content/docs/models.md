---
title: Choosing a model
description: Add a model from the list, run it as Custom, or bring your own worker or Civitai link.
---

Open **Models**. There are three ways to get a model, under **Add a model**.

| | Add | Custom | Your own worker |
|---|---|---|---|
| What runs it | RunPod's own worker | your copy of a Cobalt Pear worker | your copy of a Cobalt Pear worker, or any worker you made |
| LoRAs | no | yes | yes (Cobalt Pear workers) |
| Setup | fewest steps — or **Make it** does it for you | copy the worker on GitHub, then make the endpoint | copy the worker on GitHub, then make the endpoint |
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

Press **Add**, then either:

- tick **Let Cobalt Pear make it on RunPod** and press **Make it** — the endpoint is made for you.
  Your RunPod key passes through a small relay ([its code](https://github.com/cobaltpear/relay/blob/main/worker.js)), which keeps nothing about you — only how many times each model was made.
- or do the RunPod steps the app shows, then paste the endpoint ID.

Models added this way take a prompt, size and seed. They show **No LoRA on this worker**.

## Custom

**Custom** runs a list model on your own copy of the *Any Civitai model* worker for its family (SDXL, FLUX.1 or Z-Image), so LoRAs work there.
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

Then follow the [setup guide](https://cobaltpear.github.io/guide.html) to make the endpoint.
