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
- [x] Render the full grid
- [x] Add the implementation of turns (ready would be nice for re-use but we'll see how far the rabbit hole we go)
- [x] Add logic for attracting
- [-] Add the first 2 movement spells
  - Astral Leap and Double Leap implemented. I want those to be solid before introducing Immobilism
- [x] Add flames (adds)
- [x] Add logic for moving onto flame to remove
- [x] Add logic for adds attracting upon spell cast
- [x] Add logic for failure/success 
  - [x] Bonus: Add reason for failure
- [x] Add logic for reset
- [-] Drills/exercises
  - [x] 1 flame (3 sq, 2 sq, 4 sq)
    - Some meta commentary here. I think the 3 sq scenario is the 'main' set up you want to aim for, and you effectively want to leverage Double Leap to turn the 2 and 4 sq scenarios into a 3 sq. I want this to be the core concept that gets introduced before introducing additional enemies
  - [ ] 2 flame (chevron, pure diagonal, chain). Separate drill for the 3 skill (opposite diagonal)
  - [ ] 3 flame (pure diagonal, chevron + one fill)
- [x] Add Immobilism

## Known bugs
- 2 flame scenarios introduced but not validated
  - 2-1 spawning only opposite each other
  - 2-3 spawning 2-4 diagonals away, not the diagonals 2 and 4 diagonals away
  - 2-2 second enemy not purely adjacent
  - Given that Gemini shit the bed before I had copied over some of the fixes above, I'll need to sanity check that
    - We do not lose landing next to an enemy while triggering elimination
    - Enemy colliding into another enemy causes loss
     - Cell highlighting on loss in the above scenario triggers proper highlighting

## Edge case testing
- Looking at a video, Double Leap has a cross AoE rather than square. Can I leap into a diagonal from an enemy without losing?

### Future goals
- [ ] Menu/nav for drills vs sim
- [ ] Simulation support
  - [ ] Create full grid
  - [ ] Render Bolgrot's Spirit on the map (just tested it - casting spells onto that square is a no-op. Still lose hp though!)
- [ ] Add glyphs for spawning adds. This also involves looking at various screenshots for spawn locations as they seem pseudo random. Note: 36 spawns over 6 turns
