import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { GameControlComponent } from './containers/game-control/game-control.component';
import { TimerComponent } from './components/timer/timer.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { GridComponentComponent } from './components/grid-component/grid-component.component';

import { AsyncyPipe } from '@tony-builder/asyncy';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    GameControlComponent,
    TimerComponent,
    ScoreBoardComponent,
    GridComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AsyncyPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
