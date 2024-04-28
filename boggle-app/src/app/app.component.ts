import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BoggleDialogService } from './boggle-dialog/boggle-dialog.service';
import { BoggleTimerComponent } from './boggle-timer/boggle-timer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(BoggleTimerComponent) boggleTimerComponent:
    | BoggleTimerComponent
    | undefined;
  title = 'bct-boggle-app';
  public player1Score: number = 0;
  public player2Score: number = 0;

  public currentPlayer: string = 'Cyborg99';

  constructor(
    private boggleDialogService: BoggleDialogService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  public switchPlayer(): void {
    if (this.currentPlayer === 'Cyborg99') {
      // Switch to Strike Eagle
      this.currentPlayer = 'Strike Eagle';
    } else {
      // Switch to Cyborg99
      this.currentPlayer = 'Cyborg99';
      if (this.player1Score > this.player2Score) {
        this.showDialog('Player 1 won the Game 🎉🥳');
        this.stopTimer();
      } else if (this.player1Score === this.player2Score) {
        this.showDialog('Draw Game⛔️');
        this.stopTimer();
      } else {
        this.showDialog('Player 2 won the Game 🎉🥳');
        this.stopTimer();
      }
    }
  }

  public playerScore1(event: number): void {
    this.player1Score = event;
  }

  public playerScore2(event: number): void {
    this.player2Score = event;
  }

  public showDialog(message: string): void {
    const data = { message: message, button: 'Restart' };
    this.boggleDialogService.openDialog(data);
  }

  public stopTimer(): void {
    if (this.boggleTimerComponent) {
      this.boggleTimerComponent.stopTimer();
    }
  }
}
