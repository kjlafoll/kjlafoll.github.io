---
title: Research
nav:
  order: -1
  tooltip: Research Program
---

# {% include icon.html icon="fa-solid fa-microscope" %}Research Overview

Human behavior unfolds within a web of complex, interacting forces that change and evolve over time. A person's emotional state, for example, may shift suddenly or persist unexpectedly, influenced by prior experiences, social context, and internal feedback loops. Our lab studies these processes as complex dynamical systems, using computational modeling to uncover the underlying patterns that drive behavior. By focusing on how these systems evolve, we aim to reveal new insights into decision-making, emotions, and social interactions.

## Processes of Affective Decision-Making

A key area of our research focuses on understanding how emotions influence decision-making processes. Traditional models often treat emotions as linear, self-regulating processes that return to equilibrium after a disturbance. However, our work challenges this notion by demonstrating that emotional experiences are far more intricate and subject to sudden shifts. Using equation discovery algorithms like Sparse Identification of Nonlinear Dynamics (SINDy), we have uncovered models that reveal nonlinear patterns in how emotions evolve over time.

For example, in studies utilizing high-resolution data from Experience Sampling Method research, we found that emotional states do not merely gravitate toward a stable baseline but can undergo bifurcations—abrupt transitions between stable emotional states. These findings suggest that emotions are influenced by past experiences and contextual factors in ways that traditional models have overlooked. By applying SINDy, we have been able to capture these dynamics and provide a more accurate understanding of the complexity of emotional states (LaFollette, Demaree, & Goldenberg, in preparation).

## Understanding Attitudes, Preferences, and Social Contexts

Our work also investigates the cognitive mechanisms underlying attitudes and preferences, particularly in the context of implicit biases and decision-making. We have applied diffusion decision models (DDMs) to explore how individuals navigate complex social judgments and how biases manifest in behavior. In a recent study, we used DDMs to examine implicit bias by analyzing over 115,000 Implicit Association Test (IAT) sessions. Our findings showed that response caution—how much individuals trade speed for accuracy—plays a significant role in tasks that challenge their implicit biases, particularly in trials that conflict with their biases. This nuanced understanding suggests that traditional implicit bias measures like the IAT's D-score may conflate several cognitive processes, which can be disentangled using more sophisticated models ([LaFollette, Rubez, Demaree, & Goldenberg, Nature Human Behaviour, accepted in principle](https://osf.io/e97rf)).

In another line of research, we examined how racialized perceptions influence the evaluation of group emotions. Using DDMs, we found that individuals took longer and exercised more caution when judging crowds with a higher proportion of Black faces, particularly when negative emotions like anger were involved. These findings illustrate the subtle yet significant role that racial biases play in social decision-making, offering critical insights into how perceptions are shaped by implicit attitudes (Goldenberg*, LaFollette*, Huang, Weisz, & Cikara, Scientific Reports, in press).

## Methods for Advancing Psychological Theory

Our lab is also committed to advancing psychological theory through the development of innovative modeling techniques. One key approach we use is equation discovery algorithms for data-driven model development, through methods like Sparse Identification of Nonlinear Dynamics (SINDy). This technique allows us to derive governing equations from empirical data without relying on strong prior assumptions. We have successfully applied SINDy to human reinforcement learning, resulting in the Quadratic Q-Weighted (QQW) model, a novel framework that captures the nonlinear dynamics of how individuals learn from rewards and punishments. The QQW model provides new insights into the learning process and has outperformed traditional models across several datasets, highlighting the potential of equation discovery to uncover hidden patterns in complex cognitive behaviors ([LaFollette, Yuval, Schurr, Melnikoff, & Goldenberg, PNAS, under review](https://osf.io/preprints/psyarxiv/65jqh)).

In addition to equation discovery, we have developed the Flexible Diffusion Decision Model (FlexDDM) package to overcome limitations in traditional diffusion decision models (DDMs). Standard DDMs rely on likelihood-based inference, which requires analytically tractable likelihood functions for parameter estimation—a significant barrier when dealing with more complex cognitive processes. FlexDDM addresses this challenge by enabling the use of simulation-based methods, allowing researchers to estimate parameters for custom-built models that go beyond the scope of traditional approaches. FlexDDM also includes automated validation tools to ensure model accuracy and reliability, facilitating the creation of robust and flexible decision models ([LaFollette, Fan, Puccio, & Demaree, AMPPS, under review](https://osf.io/preprints/psyarxiv/j9m67)). Together, these computational tools push the boundaries of psychological modeling, offering more precise insights into cognitive and behavioral dynamics.

* Shared co-first authorship