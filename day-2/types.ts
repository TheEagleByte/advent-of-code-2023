export type Round = {
  [key: string]: number;
};

export type Game = {
  game: number;
  possible: boolean;
  rounds: Round[];
};
