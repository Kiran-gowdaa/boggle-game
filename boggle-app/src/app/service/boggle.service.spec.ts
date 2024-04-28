import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BoggleService } from './boggle.service';

describe('BoggleService', () => {
  let service: BoggleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoggleService],
    });
    service = TestBed.inject(BoggleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Generate English/French Alhpabets', () => {
    it('should return a 4x4 grid of shuffled dice', () => {
      const grid = service.generateEnglishAlphabetsDice();
      expect(grid.length).toEqual(4);
      expect(grid[0].length).toEqual(4);
    });
  });

  describe('Generate German Alhpabets', () => {
    it('should return a 4x4 grid of shuffled dice', () => {
      const grid = service.generateGermanAlphabetsDice();
      expect(grid.length).toEqual(4);
      expect(grid[0].length).toEqual(4);
    });
  });

  describe('Load English Words List', () => {
    it('should return an Observable of string array containing English words', () => {
      const testData = 'test\nword\nlist';
      service.loadEnglishWordsList().subscribe((words) => {
        expect(words).toEqual(['test', 'word', 'list']);
      });

      const req = httpTestingController.expectOne(
        'assets/wordlist-english.txt'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });
  });

  describe('Is Valid Word', () => {
    it('should return true if the word is valid on the board', () => {
      const board: string[][] = [
        ['R', 'I', 'F', 'O'],
        ['B', 'O', 'X', 'F'],
        ['E', 'H', 'E', 'Y'],
        ['D', 'E', 'N', 'O'],
      ];
      const word = 'BOX';
      expect(service.isValidWord(board, word)).toBe(true);
    });

    it('should return false if the word is not valid on the board', () => {
      const board: string[][] = [
        ['R', 'I', 'F', 'O'],
        ['B', 'X', 'I', 'F'],
        ['E', 'H', 'E', 'Y'],
        ['D', 'E', 'N', 'O'],
      ];
      const word = 'CAT';
      expect(service.isValidWord(board, word)).toBe(false);
    });
  });
});
