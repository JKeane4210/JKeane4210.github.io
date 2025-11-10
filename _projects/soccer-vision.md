---
layout: page
title: Soccer Computer Vision
description: Mentored a group of undergraduate soccer players in creating a soccer computer vision system for MSOE.
img: assets/img/yolo_soccer.jpg
importance: 3
related_publications: true
category: work
---

MSOE's AI club pushes for upperclassmen/graduate students to mentor research groups of undergraduates. Being an alumni of MSOE's men's soccer team, I offered to create a research group that would mentor current players on the team in Software Engineering and Computer Science majors in developing a computer vision system for analyzing men's soccer games with the camera that we have mounted at Viets Field. Through this project, I mentored Adrian Manchado, Tanner Cellio, Nico Picha, Joey Loduca, and Asher Harris, teaching them about about CNNs, YOLO image classification models, and the SAM2 image segmentation model.

Two of the student I mentored, Adrian Manchado and Tanner Cellio, wanted to push this project further. Partnering with Dr. Ian Wang from MSOE, we defined two independent studies for the second semester of this project. Tanner would work on player classification and stitching across video frames, while Adrian would work on coordinate prediction and applying homography to points on the field to allow for mapping player movements to actual distances traveled on the field. As a result of this work, we developed a combined research paper describing our system and published our paper {% cite manchado_cellio2025soccervision %} in the 2025 *Midwest Instruction and Computing Symposium (MICS)* where Adrian and Tanner presented our work in Minneapolis, Minnesota at Augsburg University. 

To conclude the school year, I also worked with Adrian and Tanner to submit this work to MSOE's ROSIE Supercomputer Competition sponsored by NVIDIA. They were selected as finalists, so we prepared for them to present to the judges:

* Dr. Jeremy Kedziora, MSOE Associate Professor and Pieper Power Endowed Chair AI

* Nick Haeml, VP of Healthcare Computer Vision and Graphics Software at NVIDIA

* Dwight Diercks, VP of Engineering at NVIDIA

Of these finalists, our group won third prize including $3000 and 2 NVIDIA GPUs and a NVIDIA Jetson Nano. After completing this project, they also received the opportunity to continue development on this project as a paid REU program through MSOE. All in all, it was amazing to watch my teammates learn over the course of the year and I am incredibly proud to have gotten to be a small part of their journey.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mics_submitted.jpg" title="Adrian, Tanner, and I celebrating after submitting our paper to MICS 2025" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/rosie_soccer.jpg" title="ROSIE Competition 2023" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the left, Adrian, Tanner, and I celebrating after getting our paper submitted to MICS 2025. On the right, a picture of the MSOE men's soccer team celebrating with our group for having won 3rd prize in MSOE's ROSIE Supercomputer Competition.
</div>

