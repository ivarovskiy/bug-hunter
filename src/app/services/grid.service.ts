import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cell } from '../models/cell';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private cellsSubject = new BehaviorSubject<Cell[]>([]);
  cells$: Observable<Cell[]> = this.cellsSubject.asObservable();

  drawGrid(cellsNumber: number) {
    const cells: Cell[] = [];

    for (let i = 0; cells.length < cellsNumber; i++) {
      const cell: Cell = {
        id: i,
        color: 'rgba(238, 228, 218, 0.35)',
        isActive: false,
        isUsed: false,
      };

      cells.push(cell);
    }

    this.cellsSubject.next(cells);
  }

  activateCell() {
    const cells = this.cellsSubject.value;
    const availableCells = cells.filter(cell => !cell.isUsed);
    if (availableCells.length === 0) {
      return -1;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomCell = availableCells[randomIndex];

    randomCell.isUsed = true;
    this.updateCell(randomCell.id, 'yellow', true);
    return randomCell.id;
  }

  updateCell(targetId: number, color: string, isActive: boolean) {
    const currentCells = this.cellsSubject.value;
    const cellToUpdate = currentCells.find(cell => cell.id === targetId);

    if (cellToUpdate) {
      (cellToUpdate.isActive = isActive), (cellToUpdate.color = color);
      this.cellsSubject.next([...currentCells]);
    }
  }
}
