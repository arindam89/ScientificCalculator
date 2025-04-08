import { useEffect } from 'react';

interface KeyboardHandlers {
  handleNumberInput: (num: string) => void;
  handleOperator: (op: string) => void;
  handleDecimal: () => void;
  handleEquals: () => void;
  handleClear: () => void;
  handleBackspace: () => void;
  handlePercent: () => void;
  toggleHistory?: () => void;
  toggleDegRad?: () => void;
}

export function useKeyboardInput({
  handleNumberInput,
  handleOperator,
  handleDecimal,
  handleEquals,
  handleClear,
  handleBackspace,
  handlePercent,
  toggleHistory,
  toggleDegRad
}: KeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keydown events in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Numbers
      if (/^[0-9]$/.test(e.key)) {
        handleNumberInput(e.key);
      }
      // Operators
      else if (e.key === '+') {
        handleOperator('add');
      }
      else if (e.key === '-') {
        handleOperator('subtract');
      }
      else if (e.key === '*') {
        handleOperator('multiply');
      }
      else if (e.key === '/') {
        e.preventDefault(); // Prevent browser's find action
        handleOperator('divide');
      }
      // Decimal
      else if (e.key === '.') {
        handleDecimal();
      }
      // Equals
      else if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        handleEquals();
      }
      // Clear
      else if (e.key === 'Escape') {
        handleClear();
      }
      // Backspace
      else if (e.key === 'Backspace') {
        handleBackspace();
      }
      // Percent
      else if (e.key === '%') {
        handlePercent();
      }
      // Toggle history
      else if (e.key.toLowerCase() === 'h' && toggleHistory) {
        toggleHistory();
      }
      // Toggle degrees/radians
      else if (e.key.toLowerCase() === 'd' && toggleDegRad) {
        toggleDegRad();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleNumberInput, 
    handleOperator, 
    handleDecimal, 
    handleEquals, 
    handleClear, 
    handleBackspace, 
    handlePercent,
    toggleHistory,
    toggleDegRad
  ]);
}
