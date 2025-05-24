import { GuessCookie } from './cookie';
import { StudentListData } from './student';
import { StudentList } from './student-list';

export type GameResult = Record<
  string,
  {
    won?: boolean;
    giveUp?: boolean;
  }
>;

export type GameAnswer = Record<string, string>;

export interface GameState {
  guesses: GuessCookie;
  result: GameResult;
  answer: GameAnswer;
  yesterdayAnswer: GameAnswer;
  activeList: StudentList;
  students: StudentListData;
}
