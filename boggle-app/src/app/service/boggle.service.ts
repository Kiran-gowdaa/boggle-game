import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoggleService {
  constructor(private http: HttpClient) {}

  // Generate English and French Alphabets
  public generateEnglishAlphabetsDice(): string[][] {
    const dice = [
      'R',
      'I',
      'F',
      'O',
      'B',
      'X',
      'I',
      'F',
      'E',
      'H',
      'E',
      'Y',
      'D',
      'E',
      'N',
      'O',
      'W',
      'S',
      'U',
      'T',
      'O',
      'K',
      'N',
      'D',
      'H',
      'M',
      'S',
      'R',
      'A',
      'O',
      'L',
      'U',
      'P',
      'E',
      'T',
      'S',
      'A',
      'C',
      'I',
      'T',
      'O',
      'A',
      'Y',
      'L',
      'G',
      'K',
      'U',
      'E',
      'Q',
      'U',
      'B',
      'M',
      'J',
      'O',
      'E',
      'H',
      'I',
      'S',
      'P',
      'N',
      'V',
      'E',
      'T',
      'I',
      'G',
      'N',
      'B',
      'A',
      'L',
      'I',
      'Y',
      'T',
      'E',
      'Z',
      'A',
      'V',
      'N',
      'D',
      'R',
      'A',
      'L',
      'E',
      'S',
      'C',
      'U',
      'W',
      'I',
      'L',
      'R',
      'G',
      'P',
      'A',
      'C',
      'E',
      'M',
      'D',
    ];

    // Pass the dice value's to shuffle function to shuffle
    const shuffledDice: string[] = this.shuffle(dice);

    // Reshape the shuffled dice array into a 4x4 grid
    const result: string[][] = [];
    for (let i = 0; i < 16; i += 4) {
      result.push(shuffledDice.slice(i, i + 4));
    }

    return result;
  }

  // Generate German Alphabets
  public generateGermanAlphabetsDice(): string[][] {
    const dice = [
      'R',
      'I',
      'F',
      'O',
      'B',
      'X',
      'I',
      'F',
      'E',
      'H',
      'E',
      'Y',
      'D',
      'E',
      'N',
      'O',
      'W',
      'S',
      'U',
      'T',
      'O',
      'K',
      'N',
      'D',
      'H',
      'M',
      'S',
      'R',
      'A',
      'O',
      'L',
      'U',
      'P',
      'E',
      'T',
      'S',
      'A',
      'C',
      'I',
      'T',
      'O',
      'A',
      'Y',
      'L',
      'G',
      'K',
      'U',
      'E',
      'Q',
      'U',
      'B',
      'M',
      'J',
      'O',
      'E',
      'H',
      'I',
      'S',
      'P',
      'N',
      'V',
      'E',
      'T',
      'I',
      'G',
      'N',
      'B',
      'A',
      'L',
      'I',
      'Y',
      'T',
      'E',
      'Z',
      'A',
      'V',
      'N',
      'D',
      'R',
      'A',
      'L',
      'E',
      'S',
      'C',
      'U',
      'W',
      'I',
      'L',
      'R',
      'G',
      'P',
      'A',
      'C',
      'E',
      'M',
      'D',
      'Ä',
      'Ö',
      'Ü',
      'ß',
    ];
    // Pass the dice value's to shuffle function to shuffle
    const shuffledDice: string[] = this.shuffle(dice);

    // Reshape the shuffled dice array into a 4x4 grid
    const result: string[][] = [];
    for (let i = 0; i < 16; i += 4) {
      result.push(shuffledDice.slice(i, i + 4));
    }

    return result;
  }

  // Fisher-Yates shuffle algorithm to shuffle
  private shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Read English word list
  public loadEnglishWordsList(): Observable<string[]> {
    return this.http
      .get('assets/wordlist-english.txt', { responseType: 'text' })
      .pipe(
        map((data) => data.split('\n').map((word) => word.trim().toLowerCase()))
      );
  }

  // Read German word list
  public loadGermanWordsList(): Observable<string[]> {
    return this.http
      .get('assets/wortliste-deutsch.txt', { responseType: 'text' })
      .pipe(
        map((data) => data.split('\n').map((word) => word.trim().toLowerCase()))
      );
  }

  // Read French word list
  public loadFrenchWordsList(): Observable<string[]> {
    return this.http
      .get('assets/listedemots-francais.txt', { responseType: 'text' })
      .pipe(
        map((data) => data.split('\n').map((word) => word.trim().toLowerCase()))
      );
  }

  // Boggle using Tie (https://www.geeksforgeeks.org/boggle-using-trie/)
  public exist(board: string[][], word: string, r: number, c: number): boolean {
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (
          board[i][j] === word[0] &&
          this.search(board, word, 0, i, j, r, c)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  public search(
    board: string[][],
    word: string,
    len: number,
    i: number,
    j: number,
    r: number,
    c: number
  ): boolean {
    if (i < 0 || i >= r || j < 0 || j >= c) {
      return false;
    }

    if (board[i][j] !== word[len]) {
      return false;
    }

    if (len === word.length - 1) {
      return true;
    }

    const ch = board[i][j];
    board[i][j] = '@';

    const ans =
      this.search(board, word, len + 1, i - 1, j, r, c) ||
      this.search(board, word, len + 1, i + 1, j, r, c) ||
      this.search(board, word, len + 1, i, j - 1, r, c) ||
      this.search(board, word, len + 1, i, j + 1, r, c) ||
      this.search(board, word, len + 1, i - 1, j + 1, r, c) ||
      this.search(board, word, len + 1, i - 1, j - 1, r, c) ||
      this.search(board, word, len + 1, i + 1, j - 1, r, c) ||
      this.search(board, word, len + 1, i + 1, j + 1, r, c);

    board[i][j] = ch;
    return ans;
  }

  public isValidWord(board: string[][], word: string): boolean {
    const r = board.length;
    const c = board[0].length;

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (
          board[i][j] === word[0] &&
          this.search(board, word, 0, i, j, r, c)
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
