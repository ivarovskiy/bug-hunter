import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() timeout = 0;
  @Output() timeoutReached = new EventEmitter<void>();

  startTimer() {
    setTimeout(() => {
      this.handleTimeout();
    }, this.timeout * 1000);
  }

  private handleTimeout() {
    this.timeoutReached.emit();
  }
}
