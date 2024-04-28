import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoggleService } from '../service/boggle.service';
import { BoggleDialogService } from '../boggle-dialog/boggle-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-boggle-holder',
  templateUrl: './boggle-holder.component.html',
  styleUrl: './boggle-holder.component.css',
})
export class BoggleHolderComponent implements OnInit {
  @Input() public playerName: string = '';
  @Input() public endGame: boolean = false;
  @Output() public playerScore1 = new EventEmitter<number>();
  @Output() public playerScore2 = new EventEmitter<number>();
  public generatedAlphabets: any;
  public wordList: string[] = [];
  public keyPadValue = '';
  public player1WordsList: string[] = [];
  public player2WordsList: string[] = [];
  public player1Score: number = 0;
  public player2Score: number = 0;
  private languageChangeSubscription!: Subscription;

  constructor(
    private boggleService: BoggleService,
    private boggleDialogService: BoggleDialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeGame();
    // Subscribe to language changes
    this.languageChangeSubscription =
      this.translateService.onLangChange.subscribe(() => {
        this.initializeGame();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from language changes to avoid memory leaks
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }

  // Initialize the alphabets and words list based on language selected
  public initializeGame(): void {
    if (this.translateService.currentLang === 'en') {
      this.generatedAlphabets =
        this.boggleService.generateEnglishAlphabetsDice();
      this.boggleService.loadEnglishWordsList().subscribe(
        (data) => {
          this.wordList = data;
          console.log('english');
        },
        () => {
          this.showDialog('Error loading word list!!');
        }
      );
    } else if (this.translateService.currentLang === 'de') {
      this.generatedAlphabets =
        this.boggleService.generateGermanAlphabetsDice();
      this.boggleService.loadGermanWordsList().subscribe(
        (data) => {
          // Need to convert to lower case since the .txt file has words which are not in lower case
          this.wordList = data.map((word) => word.toLowerCase());
        },
        () => {
          this.showDialog('Error loading word list!!');
        }
      );
    } else if (this.translateService.currentLang === 'fr') {
      this.generatedAlphabets =
        this.boggleService.generateEnglishAlphabetsDice();
      this.boggleService.loadFrenchWordsList().subscribe(
        (data) => {
          this.wordList = data;
          console.log('french');
        },
        () => {
          this.showDialog('Error loading word list!!');
        }
      );
    }
  }

  // Get the keypad value of the Dice clicked
  public keyPadAlphabet(event: string): void {
    this.keyPadValue = event;
  }

  public inputValuePlayer1(event: string): void {
    const lowerCaseWord = event.trim().toLowerCase();
    if (this.wordList.includes(lowerCaseWord)) {
      const upperCaseWord = event.trim().toUpperCase();
      if (
        this.boggleService.isValidWord(this.generatedAlphabets, upperCaseWord)
      ) {
        if (!this.player1WordsList.includes(lowerCaseWord)) {
          // Check if word is not already in Player1's word list
          this.player1WordsList.push(lowerCaseWord);
          this.player1Score = this.computePlayerScore(this.player1WordsList);
          this.playerScore1.emit(this.player1Score);
        } else {
          this.showDialog('Word already entered!🙁');
        }
      }
    } else {
      this.showDialog('Word does not exist or not in Sequence!!🙁');
    }
  }

  public inputValuePlayer2(event: string): void {
    const lowerCaseWord = event.trim().toLowerCase();
    if (this.wordList.includes(lowerCaseWord)) {
      const upperCaseWord = event.trim().toUpperCase();
      if (
        this.boggleService.isValidWord(this.generatedAlphabets, upperCaseWord)
      ) {
        // Check if the word does'nt exists in Player1 Words List
        if (!this.player1WordsList.includes(lowerCaseWord)) {
          this.player2WordsList.push(lowerCaseWord);
          this.player2Score = this.computePlayerScore(this.player2WordsList);
          this.playerScore2.emit(this.player2Score);
        } else {
          this.showDialog('Word already entered!🙁');
        }
      }
    } else {
      this.showDialog('Word does not exist or not in Sequence!!🙁');
    }
  }

  // Function to calculate score based on word length
  public calculateScore(word: string): number {
    const length = word.length;
    if (length === 3 || length === 4) {
      return 1;
    } else if (length === 5) {
      return 2;
    } else if (length === 6) {
      return 3;
    } else if (length === 7) {
      return 5;
    } else if (length >= 8) {
      return 11;
    }
    return 0; // Return 0 for words shorter than 3 characters
  }

  // Function to compute score for a player's word list
  public computePlayerScore(wordList: string[]): number {
    let score = 0;
    for (const word of wordList) {
      score += this.calculateScore(word);
    }
    return score;
  }

  // Function to open dialog
  public showDialog(message: string): void {
    const data = { message: message, button: 'Close' };
    this.boggleDialogService.openDialog(data);
  }
}
