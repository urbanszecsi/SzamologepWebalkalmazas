import { add, subtract, multiply, divide } from '../calculation.js';

describe('calculator core functions', () => {
  test('add – két pozitív', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract – negatív eredmény is mehet', () => {
    expect(subtract(5, 8)).toBe(-3);
  });

  test('multiply – nulla is működik', () => {
    expect(multiply(0, 123)).toBe(0);
    expect(multiply(7, 6)).toBe(42);
  });

  test('divide – normál és nullával osztás', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('nullával osztás hibát dob', () => {
    const fn = () => divide(4, 0);

    expect(fn).toThrow('Cannot divide by zero.');
  });
});