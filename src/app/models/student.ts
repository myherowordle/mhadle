export interface Student {
  id: string;
  fullName: string;
  alias: string;
  birthday: string;
  age: number;
  gender: string;
  height: number;
  hairColor: string;
  eyeColor: string;
  quirk: string;
  quirkType: string;
  occupation: string;
  affiliation: string;
  manga: number;
}

export type StudentData = Record<string, Student>;

export type StudentListData = Record<string, StudentData>;
