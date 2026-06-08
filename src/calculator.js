#!/usr/bin/env node
// Node.js CLI calculator
// Supported operations:
//  - addition (add, +)
//  - subtraction (sub, -)
//  - multiplication (mul, *)
//  - division (div, /)
//
// This file exposes functions for unit testing and also supports CLI usage
// when run directly.

function toNumberArray(arr) {
  return arr.map((s) => {
    const n = Number(s);
    if (!Number.isFinite(n)) {
      throw new Error(`Invalid number: ${s}`);
    }
    return n;
  });
}

function add(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function mul(nums) {
  return nums.reduce((a, b) => a * b, 1);
}

function sub(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((a, b) => a - b, nums[0]);
}

function div(nums) {
  if (nums.length === 0) throw new Error('No operands for division');
  if (nums.length === 1) return nums[0];
  if (nums.slice(1).some((n) => n === 0)) {
    throw new Error('Division by zero');
  }
  return nums.slice(1).reduce((a, b) => a / b, nums[0]);
}

// Returns remainder of a divided by b
function modulo(nums) {
  if (nums.length < 2) throw new Error('Modulo requires two operands');
  const [a, b] = nums;
  if (b === 0) throw new Error('Division by zero in modulo');
  return a % b;
}

// Power: base ^ exponent
function power(nums) {
  if (nums.length < 2) throw new Error('Power requires base and exponent');
  const [base, exponent] = nums;
  return Math.pow(base, exponent);
}

// Square root with error handling for negative numbers
function squareRoot(nums) {
  if (nums.length < 1) throw new Error('Square root requires one operand');
  const n = nums[0];
  if (n < 0) throw new Error('Cannot take square root of negative number');
  return Math.sqrt(n);
}

function compute(op, nums) {
  const normalized = op.toLowerCase();
  switch (normalized) {
    case 'add':
    case '+':
      return add(nums);
    case 'mul':
    case '*':
      return mul(nums);
    case 'sub':
    case '-':
      return sub(nums);
    case 'div':
    case '/':
      return div(nums);
    case 'mod':
    case '%':
      return modulo(nums);
    case 'pow':
    case '^':
    case '**':
    case 'power':
      return power(nums);
    case 'sqrt':
    case 'square-root':
    case 'squareRoot':
      return squareRoot(nums);
    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

module.exports = { add, sub, mul, div, modulo, power, squareRoot, compute, toNumberArray };

// CLI behavior: only run when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  function usage() {
    console.error('Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]');
    console.error('Operations: add (+), sub (-), mul (*), div (/)');
    process.exit(1);
  }

  if (args.length < 3) {
    usage();
  }

  const op = args[0];
  const rawNums = args.slice(1);
  let nums;
  try {
    nums = toNumberArray(rawNums);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  try {
    const result = compute(op, nums);
    if (Number.isFinite(result)) {
      console.log(result);
      process.exit(0);
    } else {
      console.error('Result is not a finite number');
      process.exit(1);
    }
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}
