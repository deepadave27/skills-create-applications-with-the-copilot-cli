#!/usr/bin/env node
// Node.js CLI calculator
// Supported operations:
//  - addition (add, +)
//  - subtraction (sub, -)
//  - multiplication (mul, *)
//  - division (div, /)
//
// Usage examples:
//   node src/calculator.js add 2 3       # 5
//   node src/calculator.js + 1 2 3       # 6
//   node src/calculator.js sub 10 4 1    # 5  (10 - 4 - 1)
//   node src/calculator.js div 20 2 2    # 5  (20 / 2 / 2)

const args = process.argv.slice(2);

function usage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]');
  console.error('Operations: add (+), sub (-), mul (*), div (/)');
  process.exit(1);
}

if (args.length < 3) {
  usage();
}

const op = args[0].toLowerCase();
const rawNums = args.slice(1);
const nums = rawNums.map((s) => {
  const n = Number(s);
  if (!Number.isFinite(n)) {
    console.error(`Invalid number: ${s}`);
    process.exit(1);
  }
  return n;
});

let result;

try {
  switch (op) {
    case 'add':
    case '+':
      result = nums.reduce((a, b) => a + b, 0);
      break;

    case 'mul':
    case '*':
      result = nums.reduce((a, b) => a * b, 1);
      break;

    case 'sub':
    case '-':
      // subtract left-to-right: num1 - num2 - num3 ...
      result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
      break;

    case 'div':
    case '/':
      // divide left-to-right: num1 / num2 / num3 ...
      if (nums.slice(1).some((n) => n === 0)) {
        console.error('Error: Division by zero');
        process.exit(1);
      }
      result = nums.slice(1).reduce((a, b) => a / b, nums[0]);
      break;

    default:
      console.error(`Unknown operation: ${op}`);
      usage();
  }
} catch (err) {
  console.error('Computation error:', err.message || err);
  process.exit(1);
}

// Print result to stdout
if (Number.isFinite(result)) {
  console.log(result);
  process.exit(0);
} else {
  console.error('Result is not a finite number');
  process.exit(1);
}
