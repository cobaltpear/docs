---
title: Cost and speed
description: What a picture costs on RunPod and how long it takes — measured numbers, and what makes them go up or down.
---

Cobalt Pear is free. You pay RunPod for the GPU, by the second, only while a worker is running.
When no picture is being made, the worker turns off and the GPU costs nothing.

## Measured

Times from our own tests. Your numbers can be different — the GPU RunPod gives you, and how busy it is, change them.

| Model | How it was set up | GPU | First picture | Next pictures |
|---|---|---|---|---|
| Z-Image Turbo | from the list, **Make it** | 48 GB (RunPod's price: $1.29 an hour) | 108 s | 9 s |
| A FLUX.1 model | your own copy of a worker | 24 GB | — | about 26 s |

- **First picture** = the worker starting up plus the picture. The Z-Image Turbo one above, from pressing **Make it** to the picture: about 2 minutes (making the endpoint took 8 s).
- A worker you build from your own copy takes longer the first time: about 30 minutes to build, then 10–15 minutes for the first picture while it loads the model ([Set up](../setup/#wait-for-the-build)).

## What a picture costs

GPU time × RunPod's price for that GPU. For the Z-Image Turbo test above:

- one picture once the worker is on: 9 s × $1.29 an hour ≈ **$0.003**
- the two pictures with the start-up: about 2 minutes ≈ **$0.04–0.05**

These are worked out from the time and the price, not taken from a RunPod bill. Your RunPod **Billing** page shows what you really paid.

RunPod's prices for each GPU: [runpod.io/pricing](https://www.runpod.io/pricing) (Serverless).

## What makes it slower or dearer

- **Starting up.** After the worker has been off, the first picture waits for it to start. Pictures right after each other skip that.
- **Bigger GPU.** A model that needs 48 GB costs more per second than one that fits in 24 GB.
- **Bigger pictures and more steps** take more seconds each.
- **LoRAs by link** are downloaded again each time the worker starts ([LoRAs](../loras/)).

## Paying nothing while idle

A worker turns off a few seconds after its last picture, so an endpoint you aren't using costs nothing.
Don't set **Active workers** above 0 on RunPod — an active worker stays on, and you pay for it all the time.
