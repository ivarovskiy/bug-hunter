import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() timeout = 0;
  @Output() timeoutReached = new EventEmitter<void>();

  private timer: ReturnType<typeof setTimeout> | undefined;

  startTimer() {
    if (this.timeout) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.handleTimeout();
      }, this.timeout * 1000);
    }
  }

  private handleTimeout() {
    this.timeoutReached.emit();
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
