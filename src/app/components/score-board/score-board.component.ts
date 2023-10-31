import { Component, Input } from '@angular/core';
import { Scoreboard } from 'src/app/models/scoreboard';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent {
  @Input() score: Scoreboard = {
    human: 0,
    system: 0,
  };
}
