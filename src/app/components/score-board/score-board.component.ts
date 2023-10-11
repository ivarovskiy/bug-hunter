import { Component, Input, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent {
  cpPoints = 0;
  hmPoints = 0;

  constructor(public gameDataService: GameDataService) {}

  ngOnInit(): void {
    const { cpPoints, hmPoints } = this.scores;

    this.cpPoints = cpPoints;
    this.hmPoints = hmPoints;
  }
}
