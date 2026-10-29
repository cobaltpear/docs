---
title: Cost and speed
description: How you pay RunPod for pictures, and what makes them faster or slower, cheaper or dearer.
---

Cobalt Pear is free. You pay RunPod for the GPU, by the second, only while a worker is running.
When no picture is being made, the worker turns off and the GPU costs nothing.

## What a picture costs

The seconds the GPU works × RunPod's price for that GPU — see [runpod.io/pricing](https://www.runpod.io/pricing) (Serverless).
Your RunPod **Billing** page shows what you really paid.

## Waiting for the first picture

- **After a build**, the very first picture waits while the worker fetches its image and starts. This is the longest wait.
- **After the worker has been off**, the next picture waits for it to start again — usually much shorter. **FlashBoot** on makes it shorter still.
- **Pictures right after each other** skip that and come back fastest.

## What makes it slower or dearer

- **Bigger GPU.** A model that needs 48 GB costs more per second than one that fits in 24 GB.
- **Bigger pictures and more steps** take more seconds each.
- **LoRAs by link** are downloaded again each time the worker starts ([LoRAs](../loras/)).

## Paying nothing while idle

A worker turns off a few seconds after its last picture, so an endpoint you aren't using costs nothing.
Don't set **Active workers** above 0 on RunPod — an active worker stays on, and you pay for it all the time.
