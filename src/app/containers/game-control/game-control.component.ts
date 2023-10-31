import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GameDataService } from 'src/app/services/game-data.service';
import { BehaviorSubject, Subscription, merge, scan } from 'rxjs';
import { GridService } from 'src/app/services/grid.service';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { Rules } from 'src/app/models/rules';
import { Scoreboard } from 'src/app/models/scoreboard';

export enum GameState {
  Start,
  InProgress,
  End,
}

export enum User {
  SYSTEM = 'system',
  HUMAN = 'human',
}

interface Score {
  user: string;
  score: number;
}

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
})
export class GameControlComponent implements OnDestroy {
  GameState = GameState;
  gameState: GameState = GameState.Start;
  winner = '';
  activeCellId = 0;

  score: {
    human: 0;
    system: 0;
  };

  @ViewChild(TimerComponent) private timerComponent!: TimerComponent;

  globalSubscriptions = new Subscription();
  rules!: Rules;

  inputTime: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+(\.\d+)?$/),
  ]);

  //scoreboard

  timeout: BehaviorSubject<Score> = new BehaviorSubject({
    user: '',
    score: 0,
  });
  cellClick: BehaviorSubject<Score> = new BehaviorSubject({
    user: '',
    score: 0,
  });
  scoreboard$: BehaviorSubject<Scoreboard> = new BehaviorSubject({
    human: 0,
    system: 0,
  });
  // system

  constructor(
    public gameDataService: GameDataService,
    public gridService: GridService
  ) {
    this.score = {
      human: 0,
      system: 0,
    };

    this.gameDataService.setRules();

    let subscription = this.gameDataService.getRules().subscribe(rules => {
      this.rules = rules;
      this.inputTime.setValue(this.rules.timeout);
    });

    this.globalSubscriptions.add(subscription);

    subscription = merge(this.cellClick, this.timeout)
      .pipe(
        scan(
          (score, obj) => {
            if (obj.user === User.SYSTEM) {
              return { ...score, system: obj.score };
            } else if (obj.user === User.HUMAN) {
              return { ...score, human: obj.score };
            }
            return score;
          },
          { human: 0, system: 0 }
        )
      )
      .subscribe(newScore => {
        this.scoreboard$.next(newScore);
      });

    this.globalSubscriptions.add(subscription);
  }

  newGame(): void {
    const targetElement = document.getElementById('game');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    this.gameState = GameState.InProgress;

    this.score.human = 0;
    this.score.system = 0;

    this.timeout.next({
      user: '',
      score: 0,
    });
    this.cellClick.next({
      user: '',
      score: 0,
    });
    this.scoreboard$.next({
      human: 0,
      system: 0,
    });

    this.gridService.drawGrid(this.rules.numberOfCells);
    this.activeCellId = this.gridService.activateCell();
    // this.timerComponent.startTimer(); игра начнется после первого эмита пользователя
  }

  handleTimeout(): void {
    this.handleEvent(User.SYSTEM, this.score.system, 'red');
  }

  handleCellClick(): void {
    this.handleEvent(User.HUMAN, this.score.human, 'green');
  }

  handleEvent(user: string, score: number, color: string): void {
    if (score >= this.rules.endPoint) {
      this.gameState = GameState.End;
      this.timerComponent.stopTimer();

      if (user === User.HUMAN) {
        this.winner = 'You';
      } else {
        this.winner = 'System';
      }
    } else {
      if (user === User.HUMAN) {
        this.cellClick.next({ user, score: this.score.human++ });
      } else {
        this.timeout.next({ user, score: this.score.system++ });
      }

      this.gridService.updateCell(this.activeCellId, color, false);
      this.activeCellId = this.gridService.activateCell();
      this.timerComponent.startTimer();
    }
  }

  ngOnDestroy() {
    this.globalSubscriptions.unsubscribe();
  }
}
