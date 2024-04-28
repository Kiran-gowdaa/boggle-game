import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boggle-dice-holder',
  templateUrl: './boggle-dice-holder.component.html',
  styleUrls: ['./boggle-dice-holder.component.css'],
})
export class BoggleDiceHolderComponent {
  @Input() public diceAlphabets: string[][] | undefined;
  @Output() public keyPadValue = new EventEmitter<string>();

  // Emit the dice keypad value
  public selectedDice(selectedDie: string) {
    this.keyPadValue.emit(selectedDie);
  }
}
