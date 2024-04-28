import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-boggle-timer',
  templateUrl: './boggle-timer.component.html',
  styleUrls: ['./boggle-timer.component.css'],
})
export class BoggleTimerComponent implements OnInit, OnDestroy {
  @Output() timeUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() currentPlayer = '';
  timeLeft: number = 90; // 1 minute 3 seconds in seconds
  timerSubscription: Subscription | undefined;

  constructor() {}

  public ngOnInit(): void {
    this.startTimer();
  }

  public startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeUp.emit(); // Emit event when time is up
        this.resetTimer(); // Reset the timer
      }
    });
  }

  public resetTimer(): void {
    this.timeLeft = 90; // Reset timer to 1 minute and 30 seconds
  }

  public stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public ngOnDestroy(): void {
    this.stopTimer();
  }

  public formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
