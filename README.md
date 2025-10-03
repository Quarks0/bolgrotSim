# Bolgrot Simulator

This basic js app is meant to be a simulator for the Bolgrot Encounter as part of the Turquoise Dofus quest line. I spent a lot of time and energy (heh) trying to clear this encounter, and I figured a tool would be incredibly useful for a few reasons
- Fast failure + reset without an energy limitation
- The ability to familiarize with the mechanics
- Some stretch goals that I'd like to expose, likely in order of implementation
  - Reasons for failure. One of the biggest issues I had with the encounter is failing without a clear reason why
  - Drills/common set ups. There are some patterns to look out for, and I think some basic exercises for some common patterns that show up would act as a very good tutorial for people to familiarize themselves with the encounter
  - 'Undo' functionality
  - Ultra stretch - some mechanism to 'solve' the encounter for them. This would be more just to see if I was capable of doing it, but making this publicly available seems a bit against the spirit of the game. That being said, I've read that some people will have someone more experienced with the encounter in group and just ping where to go so maybe this isn't so bad.

## Current tasks
- [ ] Render the full grid
- [ ] Render the player + Bolgrot
- [ ] Add the implementation of turns (ready would be nice for re-use but we'll see how far the rabbit hole we go)
- [ ] Add logic for attracting
- [ ] Add the 3 movement spells + AP
- [ ] Add glyphs for spawning adds. This also involves looking at various screenshots for spawn locations as they seem pseudo random. Note: 36 spawns over 6 turns
- [ ] Add flames (adds)
- [ ] Add logic for moving onto add to remove
- [ ] Add logic for adds attracting upon spell cast, Spell #3
- [ ] Add logic for failure/success 
  - [ ] Bonus: Add reason for failure
- [ ] Add logic for reset

### Future goals
- [ ] Menu/nav for drills vs sim
- [ ] Drills/exercises
  - [ ] 1 flame (single hop (3 sq) => double hop (even sq)
  - [ ] 2 flame (chevron, pure diagonal, chain). Separate drill for the 3 skill (opposite diagonal)
  - [ ] 3 flame (pure diagonal, chevron + one fill)
