// Given parameters of only 12 red cubes, 13 green cubes, and 14 blue cubes
// Parse the input file and see if the game was possible.
// Example Line: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
// Output: [{
//  game: 1,
//  possible: true,
//  rounds: [
//    {
//      blue: 3,
//      red: 4
//    },
//    {
//      red: 1,
//      green: 2,
//      blue: 6
//    },
//    {
//      green: 2
//    }
//  ]
// }]

import * as fs from "fs";
import { Game, Round } from "./types";

const inputParser = (
  inputPath: string,
  redCubes: number,
  greenCubes: number,
  blueCubes: number
): Game[] => {
  const input = fs.readFileSync(inputPath, "utf8");

  const lines = input.split("\n");

  const games: Game[] = [];

  for (const line of lines) {
    // Parse the game number from the beginning of the line (Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green)
    const match = line.match(/Game (\d+):/);
    if (!match) {
      console.log("Invalid line: ", line);
      continue;
    }

    const game = parseInt(match[1], 10);

    // Parse the rounds from the line (Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green)
    const rawRounds = line.substring(match[0].length).split(";");
    const parsedRounds: Round[] = [];

    for (const rawRound of rawRounds) {
      // Parse the colors from each round (3 blue, 4 red)
      const rawColors = rawRound.split(",");

      const parsedColors: any = {};

      for (const rawColor of rawColors) {
        // Parse the color name and number of cubes (3 blue)
        const match = rawColor.trim().match(/(\d+) (\w+)/);
        if (!match) {
          console.log("Invalid color: ", rawColor);
          continue;
        }

        const number = parseInt(match[1], 10);
        const color = match[2];

        parsedColors[color] = number;
      }

      parsedRounds.push(parsedColors);
    }

    // Check if the game is possible
    let possible = true;

    // Check if there are too many cubes of any color
    for (const round of parsedRounds) {
      for (const [color, number] of Object.entries(round)) {
        if (color === "red" && number > redCubes) {
          possible = false;
        } else if (color === "green" && number > greenCubes) {
          possible = false;
        } else if (color === "blue" && number > blueCubes) {
          possible = false;
        }
      }
    }

    // Put the game together
    games.push({
      game,
      possible,
      rounds: parsedRounds,
    });
  }

  return games;
};

export default inputParser;
