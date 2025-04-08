import { create, all } from 'mathjs';
import { type HistoryItem } from './history';

// Create a configured math.js instance with all functions
const math = create(all);

// Configure the math.js instance
math.config({
  number: 'number',
  precision: 14
});

export type OperatorType = 'add' | 'subtract' | 'multiply' | 'divide' | 'power';
export type MemoryOperation = 'MC' | 'MR' | 'M+' | 'M-' | 'MS';
export type CalculatorTab = 'basic' | 'trig' | 'func';
export type FunctionType = 
  | 'sin' | 'cos' | 'tan' 
  | 'asin' | 'acos' | 'atan' 
  | 'square' | 'cube' | 'power' | 'sqrt' | 'cbrt' | 'root'
  | 'ln' | 'log' | 'exp' | 'factorial' | 'reciprocal' | 'abs'
  | 'pi' | 'e';

export interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operator: OperatorType | null;
  memory: number;
  previousCalculation: string;
  errorMessage: string | null;
  awaitingNextValue: boolean;
  isDegrees: boolean;
  activeTab: CalculatorTab;
}

export const initialCalculatorState: CalculatorState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  memory: 0,
  previousCalculation: '',
  errorMessage: null,
  awaitingNextValue: false,
  isDegrees: true,
  activeTab: 'basic'
};

export function operatorToSymbol(operator: OperatorType): string {
  const symbols: Record<OperatorType, string> = {
    'add': '+',
    'subtract': '−',
    'multiply': '×',
    'divide': '÷',
    'power': '^'
  };
  return symbols[operator];
}

export function toRadians(angle: number, isDegrees: boolean): number {
  return isDegrees ? angle * (Math.PI / 180) : angle;
}

export function toDegrees(angle: number, isDegrees: boolean): number {
  return isDegrees ? angle * (180 / Math.PI) : angle;
}

export function calculateResult(
  previousValue: string | null, 
  currentValue: string, 
  operator: OperatorType | null
): { result: number; error: string | null } {
  if (!previousValue || !operator) {
    return { result: parseFloat(currentValue), error: null };
  }

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result: number;

  try {
    switch (operator) {
      case 'add':
        result = math.add(prev, current);
        break;
      case 'subtract':
        result = math.subtract(prev, current);
        break;
      case 'multiply':
        result = math.multiply(prev, current);
        break;
      case 'divide':
        if (current === 0) {
          return { result: prev, error: 'Cannot divide by zero' };
        }
        result = math.divide(prev, current);
        break;
      case 'power':
        result = math.pow(prev, current);
        break;
      default:
        return { result: parseFloat(currentValue), error: null };
    }

    // Check for NaN, Infinity, etc.
    if (!isFinite(result)) {
      return { result: 0, error: 'Invalid calculation result' };
    }

    return { result, error: null };
  } catch (error) {
    return { result: 0, error: error instanceof Error ? error.message : 'Calculation error' };
  }
}

export function applyFunction(
  functionName: FunctionType, 
  value: number, 
  isDegrees: boolean
): { result: number; error: string | null; formattedCalculation?: string } {
  try {
    let result: number;
    let formattedCalculation: string;

    switch (functionName) {
      case 'sin':
        result = math.sin(toRadians(value, isDegrees));
        formattedCalculation = `sin(${value})`;
        break;
      case 'cos':
        result = math.cos(toRadians(value, isDegrees));
        formattedCalculation = `cos(${value})`;
        break;
      case 'tan':
        // Check for undefined values (e.g., tan(90) in degrees)
        if (isDegrees && Math.abs(value % 180) === 90) {
          return { result: 0, error: 'Undefined result' };
        }
        result = math.tan(toRadians(value, isDegrees));
        formattedCalculation = `tan(${value})`;
        break;
      case 'asin':
        if (value < -1 || value > 1) {
          return { result: 0, error: 'Input must be between -1 and 1' };
        }
        result = toDegrees(math.asin(value), isDegrees);
        formattedCalculation = `sin⁻¹(${value})`;
        break;
      case 'acos':
        if (value < -1 || value > 1) {
          return { result: 0, error: 'Input must be between -1 and 1' };
        }
        result = toDegrees(math.acos(value), isDegrees);
        formattedCalculation = `cos⁻¹(${value})`;
        break;
      case 'atan':
        result = toDegrees(math.atan(value), isDegrees);
        formattedCalculation = `tan⁻¹(${value})`;
        break;
      case 'square':
        result = math.pow(value, 2);
        formattedCalculation = `${value}²`;
        break;
      case 'cube':
        result = math.pow(value, 3);
        formattedCalculation = `${value}³`;
        break;
      case 'power':
        // This is handled differently as it requires another number
        return { result: value, error: null };
      case 'sqrt':
        if (value < 0) {
          return { result: 0, error: 'Cannot take square root of negative number' };
        }
        result = math.sqrt(value);
        formattedCalculation = `√${value}`;
        break;
      case 'cbrt':
        result = math.cbrt(value);
        formattedCalculation = `∛${value}`;
        break;
      case 'root':
        // This is handled differently as it requires another number
        return { result: value, error: null };
      case 'ln':
        if (value <= 0) {
          return { result: 0, error: 'Input must be greater than 0' };
        }
        result = math.log(value);
        formattedCalculation = `ln(${value})`;
        break;
      case 'log':
        if (value <= 0) {
          return { result: 0, error: 'Input must be greater than 0' };
        }
        result = math.log10(value);
        formattedCalculation = `log(${value})`;
        break;
      case 'exp':
        result = math.exp(value);
        formattedCalculation = `e^${value}`;
        break;
      case 'factorial':
        if (value < 0 || !Number.isInteger(value)) {
          return { result: 0, error: 'Input must be a non-negative integer' };
        }
        if (value > 170) {
          return { result: 0, error: 'Input too large' };
        }
        result = math.factorial(value);
        formattedCalculation = `${value}!`;
        break;
      case 'reciprocal':
        if (value === 0) {
          return { result: 0, error: 'Cannot divide by zero' };
        }
        result = 1 / value;
        formattedCalculation = `1/${value}`;
        break;
      case 'abs':
        result = math.abs(value);
        formattedCalculation = `|${value}|`;
        break;
      case 'pi':
        return { result: Math.PI, error: null };
      case 'e':
        return { result: Math.E, error: null };
      default:
        return { result: value, error: 'Unknown function' };
    }

    // Check for NaN, Infinity, etc.
    if (!isFinite(result)) {
      return { result: 0, error: 'Invalid calculation result' };
    }

    return { result, error: null, formattedCalculation };
  } catch (error) {
    return { result: 0, error: error instanceof Error ? error.message : 'Calculation error' };
  }
}

export function formatNumber(num: number): string {
  // Convert to string with appropriate precision
  const formatted = num.toPrecision(10);
  
  // Remove trailing zeros after decimal point
  return parseFloat(formatted).toString();
}
