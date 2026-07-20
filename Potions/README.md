# Potions

Single-screen participant-facing manager game for an 8-worker adaptation of the Potions Task.

## What it does

- Lets the participant drag `8` workers around a visual board.
- Forms groups automatically from proximity: nearby workers create ties, and connected clusters become teams.
- Uses one main visible action button: `Next round`.
- Runs paper-grounded worker behavior after each round:
  - workers pick a partner from their current group,
  - share either `1` or `2` potions,
  - sample potions with score-weighted probabilities,
  - attempt a 3-potion combination,
  - discover higher-tier potions when the triad is valid,
  - diffuse new discoveries to current neighbors.
- Shows knowledge, recent learning, and current potions in a bottom HUD.
- Animates exchanges and discoveries directly on the board.

## Files

- `index.html` - single-screen board and HUD
- `styles.css` - visual design and animations
- `app.js` - drag interaction, proximity grouping, and round logic

## How to run

Open `C:\Users\PC\Downloads\Potions\index.html` in a browser.

You can also host the folder on a simple static web server for participant use.

## Paper grounding

This build follows the mechanics described in:

- `C:\Users\PC\Downloads\derex-boyd-2016-partial-connectivity-increases-cultural-accumulation-within-groups.pdf`
- `C:\Users\PC\Downloads\s44260-026-00084-0_reference.pdf`

Core mechanics preserved:

- six shared starting ingredients,
- two innovation pathways (`A` and `B`),
- path-dependent improvement,
- dyadic interaction,
- score-weighted potion sampling,
- neighbor diffusion after discovery,
- highest-tier gains requiring cross-pathway integration.

Adaptations made for your requested game:

- `8` workers instead of the original `6`-person experiment or `50`-agent simulations,
- regrouping through spatial movement on a shared board,
- group membership inferred from proximity rather than a form-based control panel,
- single-screen, game-like presentation for participant-facing use.

## Important note

The papers clearly specify the task family and the interaction/search rules, but they do not fully enumerate every hidden recipe in a ready-to-copy implementation table on the attached pages. This version therefore aims to be a faithful, playable adaptation of the published mechanics rather than a byte-for-byte recreation of the original experimental software.
