// Process each line of the input file (input.txt)
// Convert any spelled out numbers to digits
// Strip out any non numeric characters
// Find the first and last digits of each line
// Concatenate them together to form a new number
// Sum all the new numbers together

import { readFileSync } from "fs";

const spelledOutNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

// Get the input file from the command line
const arg = process.argv[2];

// Read the input file
const input = readFileSync(arg, "utf8");

// Split the input file into lines
const lines = input.split("\n");

let sum = 0;

// Process each line into a list of numbers to add up
for (const line of lines) {
  const numbers: string[] = [];

  // Go through the line and check for spelled out numbers
  // Or numbers, and add them to the list of numbers
  // Example: xtwone3four -> [2,1,3,4]
  for (let i = 0; i < line.length; i++) {
    // Check if the current character is a number, if so add it to the list
    const char = line[i];
    if (!isNaN(parseInt(char, 10))) {
      numbers.push(char);
      continue;
    }

    // It's a letter, so go through the spelled out numbers and check if
    // The substring starting at the current index matches any of them
    for (const [key, value] of Object.entries(spelledOutNumbers)) {
      const sub = line.substring(i, i + key.length);
      if (sub === key) {
        numbers.push(value);
        break;
      }
    }
  }

  // Find the first and last digits of each line
  const first = numbers[0];
  const last = numbers[numbers.length - 1];

  // Concatenate them together to form a new number
  const newNumber = first + last;

  // Sum all the new numbers together
  sum += parseInt(newNumber, 10);
}

console.log("Total: ", sum);
