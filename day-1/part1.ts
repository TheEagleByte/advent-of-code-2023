// Process each line of the input file (input.txt)
// Strip out any non numeric characters
// Find the first and last digits of each line
// Concatenate them together to form a new number
// Sum all the new numbers together

import { readFileSync } from "fs";

// Get the input file from the command line
const arg = process.argv[2];

// Read the input file
const input = readFileSync(arg, "utf8");

// Split the input file into lines
const lines = input.split("\n");

let sum = 0;

// Process each line into a list of numbers to add up
for (const line of lines) {
  // Strip out any non numeric characters
  const numbers = line.replace(/\D/g, "");

  // Find the first and last digits of each line
  const first = numbers[0];
  const last = numbers[numbers.length - 1];

  // Concatenate them together to form a new number
  const newNumber = first + last;

  // Sum all the new numbers together
  sum += parseInt(newNumber, 10);
}

console.log("Total: ", sum);
