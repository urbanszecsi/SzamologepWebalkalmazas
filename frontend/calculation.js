
export function add(a, b) {
    validateOperands(a, b);
    return a + b;
  }
  
  export function subtract(a, b) {
    validateOperands(a, b);
    return a - b;
  }
  
  export function multiply(a, b) {
    validateOperands(a, b);
    return a * b;
  }
  
  export function divide(a, b) {
    validateOperands(a, b);
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  }
  
  function validateOperands(a, b) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError('Operands must be finite numbers.');
    }
  }
  
  
  export default { add, subtract, multiply, divide };