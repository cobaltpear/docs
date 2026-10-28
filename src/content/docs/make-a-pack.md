---
title: Make a pack
description: A pack.json tells Cobalt Pear how to call your own RunPod Serverless worker.
---

A pack is one small file, `pack.json`, that tells Cobalt Pear how to call your RunPod Serverless worker.
You need a working endpoint first — the pack only says what to send it.

## Make the file

Open the [pack maker](https://cobaltpear.github.io/pack.html) and paste a ComfyUI workflow (ComfyUI → **Workflow** → **Export (API)**), or the JSON your worker takes as `input`.
It finds the prompt, seed and size by itself where it can; change any that are wrong, then **Save pack.json**.

## Put it in your repo and try it

1. Save it as `pack.json` at the top of your worker's GitHub repo, on the `main` branch.
2. [Open Cobalt Pear](https://cobaltpear.github.io/) → **Models** → **Custom** → paste the repo's address under «Your own worker» → **Add**. No repo? **Choose a pack or ComfyUI workflow** takes the file itself.
3. Paste your endpoint ID and send a prompt. The app reads the pack again each time it opens, so a fix shows at once.

## Let people find it

Add the topic `cobalt-pear` to your repo (the ⚙️ next to About on its GitHub page).
Every worker with a pack is listed at [github.com/topics/cobalt-pear](https://github.com/topics/cobalt-pear).

## What each field means

| Field | Meaning |
|---|---|
| `format` · `engine` | `pack/1` · `comfyui` (a ComfyUI workflow) or `json` (any other worker) |
| `id` · `label` · `note` | a short id · the name shown · tips shown under the model |
| `kind` | the group it sits under in the model menu |
| `workflow` · `input` | what is sent — the ComfyUI workflow, or the RunPod `input` |
| `prompt` · `negative` · `seed` · `width` · `height` · `size` · `image` | where each value goes, as a list of places. comfyui = `[node id, input name]`, json = the path inside `input`. `size` = `"1536x960"` in one string · `image` = a starting picture as base64 |
| `sizes` · `size_step` | sizes as `[width, height, name]` · the step sizes must be a multiple of |

What your worker sends back can have any shape — the app looks through the whole `output` for files (`{type: "base64", data}`, `data:…`, base64, `https://…` links) and for text under `content`, `text`, `response`, `output` or `caption`.
