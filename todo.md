1. GameDataService (done)

- set/get rules (done)
- set/get score (done)

1. GameCell (done)

- renders the game cell
- emits onClick 

1. GameTimer (done)

- sets the timer
- emits onTimeout

1. ScoreBoard (done)

- listens to GameDataService.getScore

1. GridService

- set / get cells, their activeness, clickness, etc.
- performs cell selection, activation

1. BoardComponent

- create and layout Cells
- notifies of Cells clicks through GridService

rename BoardComponent to GridComponent (done)

1. GameControlComponent

- renders BoardComponent
- changes BoardComponent Cells through GridService
- listens to BoardComponent Cells changes through GridService
- renders Timer
- listen to Timer timeout
- change game score through GameDataService.setScore (?)
- uses RxJs race/merge to listen to both timeout and cell clicks,
  and emits a new score on either of them emits
  maybe takeuntil (?)
  ask chatGpt
