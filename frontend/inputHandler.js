import {add} from './calculation.js'
import {subtract} from './calculation.js'
import {multiply} from './calculation.js'
import {divide} from './calculation.js'

document.addEventListener('DOMContentLoaded', () => {
console.log("inputHandler");
(() => {
    
    const displayEl = document.getElementById('display');
    console.log(displayEl);
    let currentInput   = '0';   
    let previousInput  = null;  
    let pendingOperator = null; 
    let resetNextInput  = false; 
  
    const updateDisplay = () => { displayEl.innerHTML = currentInput; };
  
    const appendNumber = (digit) => {
      if (resetNextInput) {
        currentInput   = digit;
        resetNextInput = false;
      } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
      }
    };
  
    const appendDecimal = () => {
      if (resetNextInput) {
        currentInput   = '0,';
        resetNextInput = false;
        return;
      }
      if (!currentInput.includes(',')) currentInput += ',';
    };
  
    const setOperator = (operator) => {
      if (pendingOperator && !resetNextInput) evaluate(); 
      previousInput    = currentInput.replace(',', '.');  
      pendingOperator  = operator;
      resetNextInput   = true;
    };
  
    const evaluate = () => {
      if (pendingOperator === null) return;
  
      const a = parseFloat(previousInput);
      const b = parseFloat(currentInput.replace(',', '.'));
  
      const result = (() => {
        switch (pendingOperator) {
          case '+': return add(a, b);
          case '-': return subtract(a, b);
          case 'x': return multiply(a, b);
          case '÷': return divide(a, b);
          default:  return a;
        }
      })();
  
      currentInput    = String(result).replace('.', ','); 
      pendingOperator = null;
      resetNextInput  = true;
    };
  
    const clearAll = () => {
      currentInput    = '0';
      previousInput   = null;
      pendingOperator = null;
      resetNextInput  = false;
    };
  
    document.querySelectorAll('.btn-number').forEach(btn =>
      btn.addEventListener('click', ({ target }) => {
        appendNumber(target.dataset.value);
        updateDisplay();
      })
    );
  
    document.querySelectorAll('.btn-decimal').forEach(btn =>
      btn.addEventListener('click', () => {
        appendDecimal();
        updateDisplay();
      })
    );
  
    document.querySelectorAll('.btn-operator').forEach(btn =>
      btn.addEventListener('click', ({ target }) => {
        setOperator(target.dataset.value);
        updateDisplay();
      })
    );
  
    document.querySelectorAll('.btn-equals').forEach(btn =>
      btn.addEventListener('click', () => {
        evaluate();
        updateDisplay();
      })
    );
  
    document.querySelectorAll('.btn-clear').forEach(btn =>
      btn.addEventListener('click', () => {
        clearAll();
        updateDisplay();
      })
    );
  
    updateDisplay();
  })();
})