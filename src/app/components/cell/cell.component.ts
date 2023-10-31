import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() id: number | undefined;
  @Input() isActive = false;
  @Input() color = 'rgba(238, 228, 218, 0.35)';
  @Output() cellClicked = new EventEmitter<void>();

  onClick(): void {
    if (this.isActive) {
      this.cellClicked.emit();
    }
  }
}
