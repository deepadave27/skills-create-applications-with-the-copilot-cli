const { add, sub, mul, div, compute, toNumberArray } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5 and multiple operands', () => {
    expect(add([2, 3])).toBe(5);
    expect(compute('+', [2, 3])).toBe(5);
    expect(add([1, 2, 3, 4])).toBe(10);
  });

  test('subtraction: 10 - 4 = 6 and chained subtraction', () => {
    expect(sub([10, 4])).toBe(6);
    expect(compute('-', [10, 4])).toBe(6);
    expect(sub([10, 3, 2])).toBe(5); // 10 - 3 - 2 = 5
  });

  test('multiplication: 45 * 2 = 90 and multiple operands', () => {
    expect(mul([45, 2])).toBe(90);
    expect(compute('*', [45, 2])).toBe(90);
    expect(mul([2, 3, 4])).toBe(24);
  });

  test('division: 20 / 5 = 4 and chained division', () => {
    expect(div([20, 5])).toBe(4);
    expect(compute('/', [20, 5])).toBe(4);
    expect(div([100, 5, 2])).toBe(10); // 100 / 5 / 2 = 10
  });

  test('edge cases: single operand, empty arrays', () => {
    expect(sub([5])).toBe(5);
    expect(div([5])).toBe(5);

    expect(add([])).toBe(0);
    expect(mul([])).toBe(1);
  });

  test('division by zero throws', () => {
    expect(() => div([10, 0])).toThrow(/Division by zero/);
    expect(() => compute('/', [10, 0])).toThrow(/Division by zero/);
  });

  test('toNumberArray throws on invalid input', () => {
    expect(() => toNumberArray(['a'])).toThrow(/Invalid number/);
  });
});
