---
title: Cost and speed
description: What a picture costs on RunPod and how long it takes — measured numbers, and what makes them go up or down.
---

Cobalt Pear is free. You pay RunPod for the GPU, by the second, only while a worker is running.
When no picture is being made, the worker turns off and the GPU costs nothing.

## Measured

Our own tests, each tried once on one day (October 2026) — not figures from RunPod. Times are from sending a picture to getting it back. Yours will be different: the GPU RunPod gives you, and how busy it is, change them.

### A model from the list (Make it)

| Model | GPU | First picture | Next pictures | After 12 minutes off |
|---|---|---|---|---|
| Z-Image Turbo | 48 GB (RunPod's price: $1.29 an hour) | 108 s | 9 s | 10 s |

From pressing **Make it** to the first picture: about 2 minutes (making the endpoint took 8 s).

### Your own ComfyUI worker

Building the worker took **14–16 minutes** (Z-Image, Chroma and FLUX.1 checkpoints). Then:

| Model | GPU | First picture | Next pictures | After 10 minutes off |
|---|---|---|---|---|
| SD 1.5 | 24 GB | 1.5 min | 3 s | 31 s |
| SDXL | 24 GB | 3 min | 13 s | 37 s |
| Pony (A1111 worker) | 24 GB | 6 min | 10 s | 34 s |
| Z-Image Turbo | 24 GB | 7 min | 13 s | 31 s |
| A Z-Image fine-tune (12 steps) | 24 GB | 11 min | 19 s | 31 s |
| FLUX.1 | 24 GB | 6.5 min | 28 s | 7.5 min |
| Chroma1-Flash (12 steps) | 24 GB | 8.5 min | 16 s | 1.5 min |
| Chroma (40 steps) | 24 GB | 8 min | 1.5 min | 3 min |
| A Qwen-Image fine-tune (25 steps) | 24 GB | 12 min | 3 min | 3.5 min |
| Qwen-Image-Edit (changing a picture) | 48 GB | 11 min | 13 s | 34 s |

- **First picture** = the very first one after a build: the worker fetching its image (about 25 GB) and starting, plus the picture.
- **After … off** = the worker had turned itself off and started again. Usually about half a minute; once (FLUX.1 above) it took as long as the first picture.
- 24 GB here = RunPod's cheapest 24 GB cards (RTX A5000, L4, RTX 3090, RTX 4090: about $0.69–1.10 an hour on their price list).

## What a picture costs

GPU time × RunPod's price for that GPU. For the Z-Image Turbo test from the list above:

- one picture once the worker is on: 9 s × $1.29 an hour ≈ **$0.003**
- an SDXL picture on your own worker: 13 s × $0.69 an hour ≈ **$0.0025**
- the two pictures with the start-up: about 2 minutes ≈ **$0.04–0.05**

These are worked out from the time and the price, not taken from a RunPod bill. Your RunPod **Billing** page shows what you really paid.

RunPod's prices for each GPU: [runpod.io/pricing](https://www.runpod.io/pricing) (Serverless).

## What makes it slower or dearer

- **Starting up.** After the worker has been off, the next picture waits for it to start — the very first start on a new endpoint is the slowest. Pictures right after each other skip that.
- **Bigger GPU.** A model that needs 48 GB costs more per second than one that fits in 24 GB.
- **Bigger pictures and more steps** take more seconds each.
- **LoRAs by link** are downloaded again each time the worker starts ([LoRAs](../loras/)).

## Paying nothing while idle

A worker turns off a few seconds after its last picture, so an endpoint you aren't using costs nothing.
Don't set **Active workers** above 0 on RunPod — an active worker stays on, and you pay for it all the time.
