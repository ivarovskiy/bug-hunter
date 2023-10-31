import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GameRulesService } from './game-rules.service';
import { Rules } from '../models/rules';
// import { User } from '../containers/game-control/game-control.component';

// type IUser = {
//   id: string;
//   name: string;
// };

// export type Score = {
//   [key in keyof IUser]: string;
// }; // передаем ключ-значение

// const initialScore: Score = {
//   id: '', // Начальное значение для поля id
//   name: '', // Начальное значение для поля name
// };

@Injectable({
  providedIn: 'root',
})
export class GameDataService implements OnDestroy {
  subscription: Subscription = new Subscription();
  subjectRules = new BehaviorSubject<Rules>({
    numberOfCells: 0,
    timeout: 0,
    endPoint: 0,
  });
  // subjectScore = new BehaviorSubject<Score>(initialScore);

  // private scoreSubject = new BehaviorSubject<{ [key in User]: number }>({
  //   [User.HUMAN]: 0,
  //   [User.SYSTEM]: 0,
  // });

  // public score$: Observable<{ [key in User]: number }> =
  //   this.scoreSubject.asObservable();

  // public updateScore(points: number, user: User): void {
  //   this.scoreSubject.value[user] += points;
  //   this.scoreSubject.next({ ...this.scoreSubject.value });
  // }

  // public getScore(): Observable<{ [key in User]: number }> {
  //   return this.scoreSubject.asObservable();
  // }

  constructor(private gameRulesService: GameRulesService) {}

  public setRules(): void {
    this.subscription = this.gameRulesService
      .getGameRules()
      .subscribe(rules => {
        this.subjectRules.next(rules);
        console.log('Правила игры загрузились', rules);
      });
  }

  public getRules(): Observable<Rules> {
    return this.subjectRules.asObservable();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
