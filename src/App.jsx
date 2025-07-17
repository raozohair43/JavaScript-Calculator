import React, { useState } from 'react';
import './App.css';

const buttons = [
  { id: 'clear', value: 'AC' },
  { id: 'divide', value: '/' },
  { id: 'multiply', value: '*' },
  { id: 'seven', value: '7' },
  { id: 'eight', value: '8' },
  { id: 'nine', value: '9' },
  { id: 'subtract', value: '-' },
  { id: 'four', value: '4' },
  { id: 'five', value: '5' },
  { id: 'six', value: '6' },
  { id: 'add', value: '+' },
  { id: 'one', value: '1' },
  { id: 'two', value: '2' },
  { id: 'three', value: '3' },
  { id: 'equals', value: '=' },
  { id: 'zero', value: '0' },
  { id: 'decimal', value: '.' },
];

function App() {
  const [input, setInput] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const endsWithOperator = /[+\-*/]$/;
  const endsWithNegative = /[+\-*/]-$/;

  const handleClear = () => {
    setInput('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleNumber = (val) => {
    if (evaluated) {
      setInput(val);
      setFormula(val);
      setEvaluated(false);
    } else {
      if (input === '0' || endsWithOperator.test(formula)) {
        setInput(val);
      } else {
        setInput(input + val);
      }
      setFormula(
        formula === '' || formula === '0' ? val : formula + val
      );
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setInput('0.');
      setFormula('0.');
      setEvaluated(false);
    } else if (!input.includes('.')) {
      setInput(input + '.');
      setFormula(formula + '.');
    }
  };

  const handleOperator = (val) => {
    if (evaluated) {
      setFormula(input + val);
      setInput(val);
      setEvaluated(false);
    } else if (!endsWithOperator.test(formula)) {
      setFormula(formula + val);
      setInput(val);
    } else if (!endsWithNegative.test(formula)) {
      if (val === '-') {
        setFormula(formula + val);
      } else {
        setFormula(formula.slice(0, -1) + val);
      }
      setInput(val);
    } else {
      setFormula(formula.slice(0, -2) + val);
      setInput(val);
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(formula).toFixed(5).replace(/\.?0+$/, '');
      setInput(result);
      setFormula(formula + '=' + result);
      setEvaluated(true);
    } catch {
      setInput('Error');
    }
  };

  const handleClick = (val) => {
    if (!isNaN(val)) return handleNumber(val);
    if (val === '.') return handleDecimal();
    if (val === 'AC') return handleClear();
    if (val === '=') return handleEquals();
    return handleOperator(val);
  };

  return (
    <div className="App">
      <div id="calculator">
        <div id="display">{input}</div>
        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              id={btn.id}
              onClick={() => handleClick(btn.value)}
              className={isNaN(btn.value) && btn.value !== '.' ? 'operator' : ''}
            >
              {btn.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
