import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/cell';
import { GridService } from 'src/app/services/grid.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() activeCellId = -1;
  cells: Cell[] = [];
  isClicked = false;

  constructor(public gridService: GridService) {}

  ngOnInit(): void {
    this.gridService.cells$.subscribe((cells: Cell[]) => {
      this.cells = cells;
    });
  }

  handleCellClick(id: number): void {
    this.gridService.successClick(id, true);
    this.isClicked = true;
  }
}
