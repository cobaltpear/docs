---
title: LoRAs
description: Add LoRAs from Civitai or Hugging Face, and pick between building them into the worker or using them by link.
---

A LoRA is a small add-on file that changes a model's style, character or details.
Cobalt Pear takes LoRAs from **Civitai** and **Hugging Face** links.

## Which way to pick

When you press **+ LoRA** on a model, you choose one of two ways.

| | Built into the worker | By link |
|---|---|---|
| Pick it when | you keep using the **same LoRAs** | you are **trying many LoRAs** |
| Pictures | no wait for downloads, even after the worker restarts | slower: the worker downloads each LoRA first, and again each time it restarts after being idle |
| Changing LoRAs | build the worker again (many minutes) | paste a new link, use it on the next picture |
| How many | no set number — the limit is build time | up to 4 in one picture (can be raised) |

**In short:** settled on a set of LoRAs → *Built into the worker*. Still testing → *By link*.

## Built into the worker

1. Press **+ LoRA**, pick **Built into the worker**, and paste the links.
2. The app shows one line to put in your copy's `Dockerfile`, with a link that opens it.
3. RunPod builds the worker again. Nothing to press when it's done — the next picture tells the app.

Until the new build is ready, pictures come out without the new LoRAs and say so.

For each picture you pick which built-in LoRAs to use from the **LoRA** button next to **Send**.

:::caution[Keep the list short]
Each LoRA makes the build longer and the worker bigger (the app shows how many GB they add).
RunPod stops a build that runs over 30 minutes.
:::

## By link

1. Press **+ LoRA**, pick **By link**, and paste a Civitai or Hugging Face link.
2. Use it on the next picture. Nothing to build.

The worker downloads the LoRA before the picture, and again each time it starts after being idle.

### More than 4 at once

By default one picture takes up to 4 linked LoRAs. To allow 8:

1. On RunPod, open your endpoint → **Manage** → **Edit Endpoint**.
2. Under **Environment Variables**, add `REMOTE_LORA_MAX` with the value `8`.
3. Press **Save Endpoint**.

## When a model shows "No LoRA on this worker"

That model runs on RunPod's own worker, which takes only a prompt, size and seed.
LoRAs need one of the Cobalt Pear worker repos (ComfyUI or A1111), or **Custom** on a list model.
