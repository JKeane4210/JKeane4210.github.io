---
layout: page
title: Error-Correcting Music Transformers (UR)
description: Undergraduate research project for doing MIDI music generation and error correction.
img: assets/img/music_transformer.png
importance: 2
related_publications: true
category: work
---

As my first research experience, I worked in MSOE's undegraduate research program under advisor Dr. Josiah Yoder to produce my research project {% cite keane2023errorcorrectingmusictransformers %}. Going into this project, I had very little knowledge of what a transformer is and why it was needed for music generation, so the first part of this curriculum involved literature view to understand the domain that I was working in. After doing this review, I proposed the potential research project of being able to create an encoder-decoder transformer architecture that would work like a composer "iterating" on a piece of music by taking in a piece of music through the encoder and correcting errors/anomalies in the given piece.

With this project, I produced a research paper and presented this research at the 2023 Midwest Instruction and Computing Symposium (MICS) at the University of Northern Iowa in Cedar Falls, Iowa.

## Combined Music Transformers Work

While working on my undegraduate research project, Michael Conner, another MSOE undergraduate was working a second independent music transformer project that aimed to improve a decoder-only music generation transformer by decomposing a relative self-attention block into a semantic and temporal component, making the use of relative positional information clear to the transformer. Through the course of the year, Dr. Yoder had us collaborate in our weekly meetings in discussing ideas, leading to us listing each other as authors on our papers submitted to MICS {% cite keane2023errorcorrectingmusictransformers conner2023semanticpositionalencodingmusictransformers %}.

Additionally, we decided to create a joint submission to MSOE's ROSIE competition, an annual competition where students are tasked to solve a problem using MSOE's ROSIE supercomputer. We were selected as finalists for presenting our work. During presentations, we were judged by Derek Riley, Program Director of the Computer Science Department; Nick Haeml, the VP of Healthcare Computer Vision and Graphics Software at NVIDIA; and Dwight Diercks, the VP of Engineering at NVIDIA, where we won first prize including $5000 and 2 NVIDIA RTX 4090 GPUs ([Article: Music to their ears: Students win Rosie Supercomputer Super Challenge for Music Transformers project](https://www.msoe.edu/about-msoe/news/details/music-to-their-ears-students-win-rosie-supercomputer-super-challenge-for-music-transformers-project/)).

<div class="portion-50 w-y-offset">
    <iframe width="100%" height="500px" src="https://www.youtube.com/embed/lKCTHH88JCM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<div class="caption">
    Our 1st prize winning ROSIE Supercomputer Competition presentation.
</div>
