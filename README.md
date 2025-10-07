# Bolgrot Simulator

This basic js app is meant to be a simulator for the Bolgrot Encounter as part of the Turquoise Dofus quest line. I spent a lot of time and energy (heh) trying to clear this encounter, and I figured a tool would be incredibly useful for a few reasons
- Fast failure + reset without an energy limitation
- The ability to familiarize with the mechanics
- Some goals that I'd like to expose, likely in order of implementation
  - Drills/common set ups. There are some patterns to look out for, and I think some basic exercises for some common patterns that show up would act as a very good tutorial for people to familiarize themselves with the encounter
  - Reasons for failure. One of the biggest issues I had with the encounter is failing without a clear reason why
  - 'Undo' functionality
  - Full simulation of the encounter
  - Ultra stretch - some mechanism to 'solve' the encounter for them. This would be more just to see if I was capable of doing it, but making this publicly available seems a bit against the spirit (heh) of the game. That being said, I've read that some people will have someone more experienced with the encounter in group and just ping where to go so maybe this isn't so bad.

## Current tasks
- [ ] Address/fix currently known bugs + edge cases
- [ ] Add high level overview
  - HP, AP, spells. Knockback, attraction. 
- [ ] Add tips on strategy? I would like to call out various 'good' positions
  - Being 3 squares away is good. Avoid diagonals with enemies. Adjacent enemies are good. Warning against immobilism.

## Known bugs
- [ ] 2-2 has a scenario where you can Double Leap onto the back enemy (probably LoS should be blocked)
- [ ] 3-3 Douple leaping to get the diagonal enemies to line up is resulting in a merge - should this result in a loss or should the attraction step result in a 1 sq move rather than 2 on a diagonal (worth edge case check somehow)

## Edge case testing
- Looking at a video, Double Leap has a cross AoE rather than square. Can I leap into a diagonal from an enemy without losing?
- Does Immobilism have an AP cost?
- How does the attraction work with enemy collision? ie 2 in front, pull onto unit. 2 enemies linear, pull (one diag, one straight?) (2-2, double leap into attract)

### Future goals
- [ ] Fight overview (Goal, mechanics)
- [ ] General tips (eg minimizing Immobilism usage, positioning set ups, links to other videos?)
- [ ] Spell tool tips?
- [ ] Simulation support
  - [ ] Create full grid
  - [ ] Render Bolgrot's Spirit on the map (just tested it - casting spells onto that square is a no-op. Still lose ap and hp though!)
- [ ] Add glyphs for spawning adds. This also involves looking at various screenshots for spawn locations as they seem pseudo random. Note: 36 spawns over 6 turns
- [ ] Menu/nav for drills vs sim
