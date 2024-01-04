import * as fs from "fs";
import inputParser from "./parser";

const inputPath = process.argv[2];
const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

const games = inputParser(inputPath, redCubes, greenCubes, blueCubes);

// Go through all the possible games and add up the game numbers
let sum = 0;

for (const game of games) {
  if (game.possible) {
    sum += game.game;
  }
}

console.log("Total: ", sum);
