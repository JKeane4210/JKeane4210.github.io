---
layout: page
title: Music Transformer Interpretability
description: MSOE AI club research group for applying a series of modern interpretability techniques to a model trained for music generation.
img: assets/img/music_transformer_interpretability.png
importance: 2
related_publications: true
category: work
---

MSOE's AI club runs year long research groups to get undegraduate students in the process of doing research. During the 2025-2026 school year, I mentored three students (Tanner Cellio, Brian Schroedl, and Darius Muntean) in a project aimed at diving deeper into how transformer models work and how recent interpretability research can be used to understand these models further. For the first phase of the project, I guided each team member through implementing their own version of a decoder-only music transformer, trained to generate MIDI sequences, using their choice of PyTorch or Tensorflow. This was paired with lectures to help build the mathematical foundations up in students about how these models work.

In the second phase of the project, we discussed interpretability concepts such as:

- Direction Vectors: A big topic in interpretability where analysis is done of subsets of data associated with different concepts to identify directions in latent space that correlate with a specific behavior. This was mapped towards music transformers to see if we could identify direction vectors associated with different keys.

- Induction Heads: A recent discovery by Anthropic's interpretability lab, which demonstrated how simple transformers develop an ability to replicate patterns previously seen in context to improve later stage performance. This was an intuitive concept to explore, as music hsa many repetitive patterns (different measures, motifs, temporal patterns, etc.).

- Patchscoping: A technique used for editing transformer generations by taking residual stream outputs from one prompt and adding it into a different prompt to produce different results. This was mapped to the domain of music by analyzing the ability change next note predictions using the residual stream from different scales.

With these works, we demonstrated our findings as a poster at MICS 2026 at UW Eau Claire {% cite celliot2026musictransformerinterpretability %}, as well as in MSOE's ROSIE competition.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mics_26.jpg" title="Darius, Brian, and Tanner showing off their poster at MICS 2026" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/rosie_poster_26.jpg" title="ROSIE Competition 2026" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the left, Darius, Brian, and Tanner showing off their poster at MICS 2026. On the right, a picture of Brian and Darius presenting an updated version of our poster at MSOE's ROSIE competition.
</div>
