import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-boggle-result-holder',
  templateUrl: './boggle-result-holder.component.html',
  styleUrl: './boggle-result-holder.component.css',
})
export class BoggleResultHolderComponent implements OnChanges {
  @Input() public playerName = '';
  @Input() public keyPadValue = '';
  @Input() public wordsList: string[] = [];
  @Input() public totalScore: number = 0;
  @Output() public inputValueChange = new EventEmitter<string>();
  public inputValue: string = '';
  public invalidInput: boolean = false;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('keyPadValue' in changes) {
      this.inputValue += this.keyPadValue;
    }
  }

  public submitValue() {
    if (!this.invalidInput) {
      this.inputValueChange.emit(this.inputValue);
      this.inputValue = '';
    }
  }

  public onInputChange(value: string) {
    // Validate the input whenever it changes
    this.invalidInput = !value.trim() || !/^[a-zA-Z\s]*$/.test(value);
  }
}
