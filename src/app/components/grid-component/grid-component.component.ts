import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Cell } from 'src/app/models/cell';
import { GridService } from 'src/app/services/grid.service';
import { GameState } from 'src/app/containers/game-control/game-control.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.scss'],
})
export class GridComponentComponent implements OnInit, OnDestroy {
  @Input() winner!: string;
  @Input() state!: GameState;
  @Input() activeCellId = -1;
  @Output() clickReached = new EventEmitter<void>();

  GameState = GameState;
  cells: Cell[] = [];
  subscription: Subscription = new Subscription();

  constructor(public gridService: GridService) {}

  ngOnInit(): void {
    this.subscription = this.gridService.cells$.subscribe((cells: Cell[]) => {
      this.cells = cells;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCellClick(): void {
    this.clickReached.emit();
  }
}
