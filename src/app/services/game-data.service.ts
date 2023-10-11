import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private humanScoreSubject = new BehaviorSubject<number>(0);
  private computerScoreSubject = new BehaviorSubject<number>(0);

  humanScore$: Observable<number> = this.humanScoreSubject.asObservable();
  computerScore$: Observable<number> = this.computerScoreSubject.asObservable();

  incrementHumanScore(): void {
    this.humanScoreSubject.next(this.humanScoreSubject.value + 1);
  }

  incrementComputerScore(): void {
    this.computerScoreSubject.next(this.computerScoreSubject.value + 1);
  }
}
