import * as fs from "fs";
import inputParser from "./parser";

const inputPath = process.argv[2];
const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

const games = inputParser(inputPath, redCubes, greenCubes, blueCubes);

// Question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
// The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
// For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?

let sum = 0;

for (const game of games) {
  const maxCubes: any = {};

  for (const round of game.rounds) {
    for (const [color, cubes] of Object.entries(round)) {
      if (!maxCubes[color] || cubes > maxCubes[color]) {
        maxCubes[color] = cubes;
      }
    }
  }

  const red = maxCubes.red || 0;
  const green = maxCubes.green || 0;
  const blue = maxCubes.blue || 0;

  sum += red * green * blue;
}

console.log("Total: ", sum);
