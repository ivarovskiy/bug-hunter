import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cell } from '../models/cell';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private cellsSubject = new BehaviorSubject<Cell[]>([]);

  cells$: Observable<Cell[]> = this.cellsSubject.asObservable();

  constructor() {
    this.initializeGrid();
  }

  public initializeGrid(): void {
    const cells: Cell[] = [];

    for (let i = 0; i < 100; i++) {
      cells.push({
        id: i,
        color: 'rgba(238, 228, 218, 0.35)',
        isActive: false,
      });
    }

    this.cellsSubject.next(cells);
  }

  activateCell() {
    const randomId = Math.floor(Math.random() * this.cellsSubject.value.length);

    this.updateCellColor(randomId, 'yellow');

    return randomId;
  }

  private updateCellColor(targetId: number, newColor: string): void {
    const currentCells = this.cellsSubject.value;

    // Найдите ячейку по id
    const cellToUpdate = currentCells.find(cell => cell.id === targetId);

    // Если ячейка найдена, обновите ее цвет
    if (cellToUpdate) {
      cellToUpdate.color = newColor;
      this.cellsSubject.next([...currentCells]); // Обновите cellsSubject
    }
  }

  updateCells(targetId: number, newColor: string): void {
    const currentCells = this.cellsSubject.value;

    const condition = (cell: Cell) => cell.id === targetId;
    const cellsToUpdate = currentCells.filter(condition);

    cellsToUpdate.forEach(cellToUpdate => {
      cellToUpdate.color = newColor;
    });

    this.cellsSubject.next(currentCells);

    console.log('updated cells:', this.cellsSubject.value);
  }

  successClick(targetId: number, isActive: boolean): void {
    const currentCells = this.cellsSubject.value;

    const condition = (cell: Cell) => cell.id === targetId;
    const cellsToUpdate = currentCells.filter(condition);

    cellsToUpdate.forEach(cellToUpdate => {
      cellToUpdate.isActive = isActive;
      cellToUpdate.color = 'green';
    });

    this.cellsSubject.next(currentCells);
  }
}
