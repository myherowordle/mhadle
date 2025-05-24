import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { RULES } from '../constants/rules';
import { GuessCookie } from '../models/cookie';
import { GameAnswer, GameResult, GameState } from '../models/game';
import { StudentListData } from '../models/student';
import { DEFAULT_STUDENT_LIST, StudentList } from '../models/student-list';
import { getCurrentUTCDateNoTime, getDayOfYear } from '../utils/date-utils';
import { LocalStorageService } from './local-storage.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameState: GameState | null = null;
  private isInitialized = false;
  private infiniteMode = false;
  private readonly doy = getDayOfYear(getCurrentUTCDateNoTime());
  private readonly gameStateChange = new ReplaySubject<GameState>(1);

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly studentService: StudentService
  ) {
    this.initializeGameState();
  }

  getGameState() {
    return this.gameState;
  }

  $gameStateChange() {
    return this.gameStateChange.asObservable();
  }

  refresh() {
    this.initializeGameState();
  }

  setGuess(guesses: GuessCookie) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    if (!this.infiniteMode) {
      this.localStorage.setGuess(guesses);
    }
    this.gameState = {
      ...this.gameState,
      guesses: guesses,
      result: this.createInitialGameResult(guesses, this.gameState.answer),
    };
    this.gameStateChange.next(this.gameState);
  }

  setActiveList(list: StudentList) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    const guess = this.localStorage.getGuess();
    guess.lastList = list;
    this.localStorage.setGuess(guess);
    this.gameState = {
      ...this.gameState,
      activeList: list,
    };
    this.gameStateChange.next(this.gameState);
  }

  setResult(result: GameResult) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    this.gameState = {
      ...this.gameState,
      result,
    };
    this.gameStateChange.next(this.gameState);
  }

  setInfiniteMode(infiniteMode: boolean) {
    this.infiniteMode = infiniteMode;
    this.initializeGameState();
  }

  setGiveUp() {
    if (this.gameState === null || !this.isInitialized) {
      return;
    } 
    this.gameState.result[this.gameState.activeList].giveUp = true;
    console.log('red', this.gameState);
    this.gameStateChange.next(this.gameState);
    if (!this.infiniteMode) {
      const guesses = { ...this.gameState.guesses };
      console.log('blue', this.localStorage.getGuess());
      guesses.giveUp = true;
      this.setGuess(guesses);
    }
  }

  addGuess(guess: string) {
    if (this.gameState === null || !this.isInitialized) {
      return;
    }
    if (
      this.gameState.result[this.gameState.activeList].won ||
      this.gameState.result[this.gameState.activeList].giveUp
    ) {
      return;
    }
    const guesses = { ...this.gameState.guesses };
    guesses.guesses[this.gameState.activeList].push(guess);
    this.setGuess(guesses);
    if (guess === this.gameState.answer[this.gameState.activeList]) {
      this.setResult({
        ...this.gameState.result,
        [this.gameState.activeList]: {
          won: true,
          ...this.gameState.result[this.gameState.activeList],
        },
      });
    }
  }

  getCurrentGuesses() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.guesses.guesses[this.gameState.activeList];
  }

  getCurrentList() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.activeList;
  }

  getCurrentStudentData() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.students[this.gameState.activeList];
  }

  getCurrentResult() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.result[this.gameState.activeList];
  }

  getCurrentAnswer() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.answer[this.gameState.activeList];
  }

  getYesterdaysStudent() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.yesterdayAnswer[this.gameState.activeList];
  }

  getTodaysStudent() {
    if (this.gameState === null) {
      return;
    }
    return this.gameState.answer[this.gameState.activeList];
  }

  getInfiniteMode() {
    return this.infiniteMode;
  }

  private initializeGameState() {
    const populatedGuess = this.createInitialGuess();
    const guesses = this.getInfiniteMode()
      ? this.createEmptyGuess()
      : populatedGuess;
    const activeList = this.createInitialListSelection();

    this.createStudentData().subscribe((students) => {
      const answer = this.createInitialGameAnswer(students);
      const yesterdayAnswer = this.createInitialYesterdayAnswer(students);
      const result = this.createInitialGameResult(guesses, answer);
      this.gameState = {
        guesses,
        answer,
        result,
        yesterdayAnswer,
        students,
        activeList,
      };
      this.gameStateChange.next(this.gameState);
      this.isInitialized = true;
    });
  }

  private createInitialGuess() {
    const guess = this.localStorage.getGuess();

    if (!guess || guess.doy !== this.doy) {
      const emptyGuess = this.createEmptyGuess(guess.lastList);
      this.localStorage.setGuess(emptyGuess);
      return emptyGuess;
    }
    return guess;
  }

  private createEmptyGuess(lastList?: StudentList) {
    return {
      guesses: {
        japan: [],
        global: [],
      },
      doy: this.doy,
      lastList: lastList ?? this.createInitialListSelection(),
      giveUp: false,
    };
  }

  private createInitialGameResult(guess: GuessCookie, gameAnswer: GameAnswer) {
    const gameResult: GameResult = {};
    for (const list in Object.keys(gameAnswer)) {
      const listEnum = list as StudentList;
      if (Object.prototype.hasOwnProperty.call(gameAnswer, listEnum)) {
        const guesses: string[] = guess.guesses[listEnum];
        const giveUp = guess.giveUp;
        gameResult[listEnum] = {
          won: guesses.includes(gameAnswer[listEnum]),
          giveUp: giveUp,
        };
      }
    }
    let guesses: string[] = guess.guesses[StudentList.JAPAN];
    let won = guesses.includes(gameAnswer[StudentList.JAPAN]);
    gameResult[StudentList.JAPAN] = {
      won: won,
      giveUp: guess.giveUp,
    };
    guesses = guess.guesses[StudentList.GLOBAL];
    won = guesses.includes(gameAnswer[StudentList.GLOBAL]);
    gameResult[StudentList.GLOBAL] = {
      won: won,
      giveUp: guess.giveUp,
    };
    return gameResult;
  }

  private createInitialGameAnswer(studentData: StudentListData) {
    if (this.infiniteMode) {
      const todaysStudents: GameAnswer = {};
      todaysStudents[StudentList.JAPAN] = this.studentService.getRandomStudent(
        studentData[StudentList.JAPAN]
      ).id;
      todaysStudents[StudentList.GLOBAL] = this.studentService.getRandomStudent(
        studentData[StudentList.GLOBAL]
      ).id;
      return todaysStudents;
    }
    const todaysStudents: GameAnswer = {};
    todaysStudents[StudentList.JAPAN] = this.studentService.getTodaysStudent(
      studentData[StudentList.JAPAN]
    ).id;
    todaysStudents[StudentList.GLOBAL] = this.studentService.getTodaysStudent(
      studentData[StudentList.GLOBAL]
    ).id;
    return todaysStudents;
  }

  private createInitialYesterdayAnswer(studentData: StudentListData) {
    const yesterdaysStudents: GameAnswer = {};
    yesterdaysStudents[StudentList.JAPAN] =
      this.studentService.getYesterdaysStudent(
        studentData[StudentList.JAPAN]
      ).id;
    yesterdaysStudents[StudentList.GLOBAL] =
      this.studentService.getYesterdaysStudent(
        studentData[StudentList.GLOBAL]
      ).id;
    return yesterdaysStudents;
  }

  private createInitialListSelection() {
    const guess = this.localStorage.getGuess() ?? { lastList: null };
    return guess.lastList ?? DEFAULT_STUDENT_LIST;
  }

  private createStudentData() {
    return this.studentService.getStudentData();
  }
}
