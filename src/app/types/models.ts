export interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface WordExample {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface RoundData {
  levelData: LevelData;
  words: WordExample[];
}

export interface WordCollection {
  rounds: RoundData[];
}

export interface WordLayout {
  word: string;
  width: number;
  left: number;
}

export type SentenceOutcome = 'pending' | 'guessed' | 'showed';

export interface HintFlags {
  audio: boolean;
  image: boolean;
  translate: boolean;
}

export type HintName = keyof HintFlags;

export interface GameProgress {
  level: number;
  round: number;
  sentence: number;
}

export interface Player {
  name: string;
  surname: string;
}

export interface GameState {
  player: Player | null;
  progress: GameProgress;
  hints: HintFlags;
  outcomes: SentenceOutcome[];
}
