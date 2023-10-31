import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameRulesService {
  private rulesUrl = 'assets/game-rules.json';

  constructor(private http: HttpClient) {}

  getGameRules(): Observable<any> {
    return this.http.get(this.rulesUrl);
  }
}
