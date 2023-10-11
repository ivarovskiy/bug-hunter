import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from 'src/app/components/board/board.component';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { GridService } from 'src/app/services/grid.service';
import { GameDataService } from 'src/app/services/game-data.service';
import { ScoreBoardComponent } from 'src/app/components/score-board/score-board.component';
import { Subject, map, race } from 'rxjs';

export enum GameState {
  Start,
  InProgress,
  End,
}

export enum User {
  SYSTEM = 'system',
  HUMAN = 'human',
}

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
})
export class GameControlComponent implements OnInit {
  gameState: GameState = GameState.Start;

  @ViewChild(TimerComponent) private timerComponent!: TimerComponent; // Получите доступ к компоненту Timer
  @ViewChild(BoardComponent) private boardComponent!: BoardComponent;
  @ViewChild(ScoreBoardComponent) private scoreBoard!: ScoreBoardComponent;

  inputTime = 0;
  activeCellId = -1;

  //scoreboard
  scoreSystem = 0;
  scoreHuman = 0;

  timeout: Subject<any> = new Subject();
  cellClick: Subject<any> = new Subject();

  scoreboard = race(this.timeout, this.cellClick).pipe(
    map((user, score) => ({
      user: user,
      score: score,
    }))
  );

  constructor(
    public gridService: GridService,
    public gameDataService: GameDataService
  ) {}

  newGame(): void {
    this.gridService.initializeGrid(); // initialize grid

    console.log('Start!!!');

    this.activeCellId = this.gridService.activateCell();

    this.timerComponent.timeout = this.inputTime; // start timer to click
    this.timerComponent.startTimer();

    this.gameState = GameState.InProgress;
    // game in progress

    // if (this.isClicked) {
    //   this.gameDataService.incrementHumanScore();
    //   this.activeCellId = this.gridService.activateCell();
    //   this.timerComponent.startTimer(); //refresh timer
    // }

    // if (this.scoreBoard.cpPoints >= 10 || this.scoreBoard.hmPoints >= 10) {
    //   this.gameState = GameState.End;
    //   clearInterval(this.timerComponent.timeout);
    //   console.log('The End!!!');
    // }
  }

  handleTimeout(): void {
    // Если таймер завершился без успешного клика
    this.timeout.next({ user: User.SYSTEM, score: this.scoreSystem++ });
    // this.gameDataService.incrementComputerScore();
    this.activeCellId = this.gridService.activateCell(); // new active cell
    this.timerComponent.startTimer();
  }

  handleCellClick() {
    this.cellClick.next({ user: User.HUMAN, score: this.scoreHuman++ });
  }

  ngOnInit(): void {
    this.gameState = GameState.Start;

    this.gameDataService.computerScore$.subscribe(score => {
      this.scoreSystem = score;
    });
    this.gameDataService.humanScore$.subscribe(score => {
      this.scoreHuman = score;
    });
  }
}
