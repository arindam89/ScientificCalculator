import { useState, useEffect, useCallback } from 'react';
import { 
  CalculatorState, 
  initialCalculatorState, 
  OperatorType, 
  FunctionType, 
  MemoryOperation,
  calculateResult,
  applyFunction,
  operatorToSymbol,
  formatNumber
} from '@/lib/calculator';
import { 
  getStoredHistory, 
  addHistoryItem, 
  getStoredSettings, 
  saveSettings, 
  HistoryItem 
} from '@/lib/history';

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    // Load settings from localStorage
    const settings = getStoredSettings();
    return {
      ...initialCalculatorState,
      isDegrees: settings.isDegrees,
      memory: settings.memory
    };
  });

  const {
    currentValue,
    previousValue,
    operator,
    memory,
    previousCalculation,
    errorMessage,
    awaitingNextValue,
    isDegrees,
    activeTab
  } = state;

  // Save settings whenever they change
  useEffect(() => {
    saveSettings({ isDegrees, memory });
  }, [isDegrees, memory]);

  // Handle number button input
  const handleNumberInput = useCallback((num: string) => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab,
          currentValue: num
        };
      }

      if (prevState.awaitingNextValue) {
        return {
          ...prevState,
          currentValue: num,
          awaitingNextValue: false
        };
      }

      const newValue = prevState.currentValue === '0' ? num : prevState.currentValue + num;
      return {
        ...prevState,
        currentValue: newValue
      };
    });
  }, []);

  // Handle decimal point
  const handleDecimal = useCallback(() => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab,
          currentValue: '0.'
        };
      }

      if (prevState.awaitingNextValue) {
        return {
          ...prevState,
          currentValue: '0.',
          awaitingNextValue: false
        };
      }

      // Don't add decimal if it already exists
      if (prevState.currentValue.includes('.')) {
        return prevState;
      }

      return {
        ...prevState,
        currentValue: prevState.currentValue + '.'
      };
    });
  }, []);

  // Handle operator buttons
  const handleOperator = useCallback((op: string) => {
    setState(prevState => {
      // Clear error state if present
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab
        };
      }

      const currentValueNum = parseFloat(prevState.currentValue);
      const operatorTyped = op as OperatorType;
      
      // If no previous value exists, store current value and operator
      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: prevState.currentValue,
          operator: operatorTyped,
          previousCalculation: `${prevState.currentValue} ${operatorToSymbol(operatorTyped)}`,
          awaitingNextValue: true
        };
      }
      
      // If operator already exists, calculate the result and set as previous value
      if (prevState.operator) {
        const { result, error } = calculateResult(
          prevState.previousValue, 
          prevState.currentValue, 
          prevState.operator
        );
        
        if (error) {
          return {
            ...prevState,
            errorMessage: error
          };
        }
        
        const resultStr = formatNumber(result);
        
        return {
          ...prevState,
          previousValue: resultStr,
          currentValue: resultStr,
          operator: operatorTyped,
          previousCalculation: `${resultStr} ${operatorToSymbol(operatorTyped)}`,
          awaitingNextValue: true
        };
      }
      
      return prevState;
    });
  }, []);

  // Handle equals button
  const handleEquals = useCallback(() => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return initialCalculatorState;
      }
      
      // Nothing to calculate if there's no operator or previous value
      if (!prevState.operator || prevState.previousValue === null) {
        return prevState;
      }
      
      const { result, error } = calculateResult(
        prevState.previousValue, 
        prevState.currentValue, 
        prevState.operator
      );
      
      if (error) {
        return {
          ...prevState,
          errorMessage: error
        };
      }
      
      const calculation = `${prevState.previousValue} ${operatorToSymbol(prevState.operator)} ${prevState.currentValue}`;
      const resultStr = formatNumber(result);
      
      // Add to history
      addHistoryItem(calculation, resultStr);
      
      return {
        ...prevState,
        currentValue: resultStr,
        previousValue: null,
        operator: null,
        previousCalculation: `${calculation} =`,
        awaitingNextValue: true
      };
    });
  }, []);

  // Handle clear button
  const handleClear = useCallback(() => {
    setState(prevState => ({
      ...initialCalculatorState,
      memory: prevState.memory,
      isDegrees: prevState.isDegrees,
      activeTab: prevState.activeTab
    }));
  }, []);

  // Handle backspace button
  const handleBackspace = useCallback(() => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab
        };
      }
      
      if (prevState.awaitingNextValue) {
        return prevState;
      }
      
      const isNegOne = prevState.currentValue === '-' || prevState.currentValue.length === 1;
      const isNegDouble = prevState.currentValue.startsWith('-') && prevState.currentValue.length === 2;
      
      if (isNegOne || isNegDouble) {
        return {
          ...prevState,
          currentValue: '0'
        };
      }
      
      return {
        ...prevState,
        currentValue: prevState.currentValue.slice(0, -1)
      };
    });
  }, []);

  // Handle toggle sign (+/-)
  const handleToggleSign = useCallback(() => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab
        };
      }
      
      if (prevState.currentValue === '0') {
        return prevState;
      }
      
      const newValue = prevState.currentValue.startsWith('-') 
        ? prevState.currentValue.slice(1) 
        : '-' + prevState.currentValue;
      
      return {
        ...prevState,
        currentValue: newValue
      };
    });
  }, []);

  // Handle percentage
  const handlePercent = useCallback(() => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab
        };
      }
      
      const currentValueNum = parseFloat(prevState.currentValue);
      const result = currentValueNum / 100;
      const resultStr = formatNumber(result);
      
      // Add to history
      addHistoryItem(`${currentValueNum}%`, resultStr);
      
      return {
        ...prevState,
        currentValue: resultStr,
        previousCalculation: `${currentValueNum}% =`,
        awaitingNextValue: true
      };
    });
  }, []);

  // Handle scientific functions
  const handleFunction = useCallback((func: FunctionType) => {
    setState(prevState => {
      if (prevState.errorMessage) {
        return {
          ...initialCalculatorState,
          memory: prevState.memory,
          isDegrees: prevState.isDegrees,
          activeTab: prevState.activeTab
        };
      }
      
      // Special case for constants
      if (func === 'pi') {
        return {
          ...prevState,
          currentValue: Math.PI.toString(),
          awaitingNextValue: true
        };
      } else if (func === 'e') {
        return {
          ...prevState,
          currentValue: Math.E.toString(),
          awaitingNextValue: true
        };
      }
      
      // Special case for operations that require a second operand
      if (func === 'power' || func === 'root') {
        const operatorType: OperatorType = func === 'power' ? 'power' : 'root';
        return {
          ...prevState,
          previousValue: prevState.currentValue,
          operator: operatorType,
          previousCalculation: `${prevState.currentValue} ${operatorToSymbol(operatorType)}`,
          awaitingNextValue: true
        };
      }
      
      const currentValueNum = parseFloat(prevState.currentValue);
      const { result, error, formattedCalculation } = applyFunction(func, currentValueNum, prevState.isDegrees);
      
      if (error) {
        return {
          ...prevState,
          errorMessage: error
        };
      }
      
      const resultStr = formatNumber(result);
      
      // Add to history if we have a formatted calculation
      if (formattedCalculation) {
        addHistoryItem(formattedCalculation, resultStr);
      }
      
      return {
        ...prevState,
        currentValue: resultStr,
        previousCalculation: formattedCalculation ? `${formattedCalculation} =` : prevState.previousCalculation,
        awaitingNextValue: true
      };
    });
  }, []);

  // Handle memory operations
  const handleMemoryOperation = useCallback((operation: MemoryOperation) => {
    setState(prevState => {
      const currentValueNum = parseFloat(prevState.currentValue);
      
      switch (operation) {
        case 'MC': // Memory Clear
          return {
            ...prevState,
            memory: 0
          };
        case 'MR': // Memory Recall
          return {
            ...prevState,
            currentValue: formatNumber(prevState.memory),
            awaitingNextValue: true
          };
        case 'M+': // Memory Add
          return {
            ...prevState,
            memory: prevState.memory + currentValueNum,
            awaitingNextValue: true
          };
        case 'M-': // Memory Subtract
          return {
            ...prevState,
            memory: prevState.memory - currentValueNum,
            awaitingNextValue: true
          };
        case 'MS': // Memory Store
          return {
            ...prevState,
            memory: currentValueNum,
            awaitingNextValue: true
          };
        default:
          return prevState;
      }
    });
  }, []);

  // Toggle between degrees and radians
  const toggleDegRad = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isDegrees: !prevState.isDegrees
    }));
  }, []);

  // Switch between calculator tabs
  const switchTab = useCallback((tab: 'basic' | 'trig' | 'func') => {
    setState(prevState => ({
      ...prevState,
      activeTab: tab
    }));
  }, []);

  // Handle history item click
  const handleHistoryItemClick = useCallback((item: HistoryItem) => {
    setState(prevState => ({
      ...prevState,
      currentValue: item.result,
      awaitingNextValue: true
    }));
  }, []);

  return {
    currentValue,
    previousCalculation,
    memory,
    errorMessage,
    isDegrees,
    activeTab,
    hasMemory: memory !== 0,
    handleNumberInput,
    handleOperator,
    handleDecimal,
    handleEquals,
    handleClear,
    handleBackspace,
    handleToggleSign,
    handlePercent,
    handleFunction,
    handleMemoryOperation,
    toggleDegRad,
    switchTab,
    handleHistoryItemClick
  };
}
