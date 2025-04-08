import { useState } from "react";

type CalculatorTab = 'basic' | 'trig' | 'func';
type FunctionType = 
  | 'sin' | 'cos' | 'tan' 
  | 'asin' | 'acos' | 'atan' 
  | 'square' | 'cube' | 'power' | 'sqrt' | 'cbrt' | 'root'
  | 'ln' | 'log' | 'exp' | 'factorial' | 'reciprocal' | 'abs'
  | 'pi' | 'e';

interface CalculatorKeypadProps {
  activeTab: CalculatorTab;
  switchTab: (tab: CalculatorTab) => void;
  onNumberInput: (num: string) => void;
  onOperator: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onDecimal: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
  onFunction: (func: FunctionType) => void;
}

export default function CalculatorKeypad({
  activeTab,
  switchTab,
  onNumberInput,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  onDecimal,
  onToggleSign,
  onPercent,
  onFunction,
}: CalculatorKeypadProps) {
  return (
    <div className="p-2 md:bg-gray-50 dark:bg-slate-800">
      {/* Scientific Function Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-3">
        <ul className="flex -mb-px text-xs sm:text-sm font-medium">
          <li className="mr-1 sm:mr-2">
            <a 
              onClick={() => switchTab('basic')}
              className={`inline-block p-1.5 sm:p-2 cursor-pointer ${activeTab === 'basic' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
            >
              Basic
            </a>
          </li>
          <li className="mr-1 sm:mr-2">
            <a 
              onClick={() => switchTab('trig')}
              className={`inline-block p-1.5 sm:p-2 cursor-pointer ${activeTab === 'trig' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
            >
              <span className="hidden sm:inline">Trigonometry</span>
              <span className="inline sm:hidden">Trig</span>
            </a>
          </li>
          <li>
            <a 
              onClick={() => switchTab('func')}
              className={`inline-block p-1.5 sm:p-2 cursor-pointer ${activeTab === 'func' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
            >
              <span className="hidden sm:inline">Functions</span>
              <span className="inline sm:hidden">Func</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Basic Panel */}
      <div className={activeTab === 'basic' ? '' : 'hidden'}>
        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-gray-200 text-slate-900 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors" onClick={onClear}>C</button>
          <button className="calculator-btn bg-gray-200 text-slate-900 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors" onClick={onBackspace}>
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
              <path d="m16 12-3.5-3.5M12.5 15.5 16 12" />
            </svg>
          </button>
          <button className="calculator-btn bg-gray-200 text-slate-900 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors" onClick={onPercent}>%</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('divide')}>÷</button>
        </div>
        
        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('7')}>7</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('8')}>8</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('9')}>9</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('multiply')}>×</button>
        </div>
        
        {/* Row 3 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('4')}>4</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('5')}>5</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('6')}>6</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('subtract')}>−</button>
        </div>
        
        {/* Row 4 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('1')}>1</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('2')}>2</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('3')}>3</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('add')}>+</button>
        </div>
        
        {/* Row 5 */}
        <div className="grid grid-cols-4 gap-2">
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={onToggleSign}>±</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('0')}>0</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={onDecimal}>.</button>
          <button className="calculator-btn bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors" onClick={onEquals}>=</button>
        </div>
      </div>

      {/* Trigonometry Panel */}
      <div className={activeTab === 'trig' ? '' : 'hidden'}>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('sin')}>sin</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('cos')}>cos</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('tan')}>tan</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('divide')}>÷</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('asin')}>sin⁻¹</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('acos')}>cos⁻¹</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('atan')}>tan⁻¹</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('multiply')}>×</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('7')}>7</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('8')}>8</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('9')}>9</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('subtract')}>−</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('4')}>4</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('5')}>5</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('6')}>6</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('add')}>+</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('pi')}>π</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('0')}>0</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={onDecimal}>.</button>
          <button className="calculator-btn bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors" onClick={onEquals}>=</button>
        </div>
      </div>

      {/* Functions Panel */}
      <div className={activeTab === 'func' ? '' : 'hidden'}>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('square')}>x²</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('cube')}>x³</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('power')}>xʸ</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('divide')}>÷</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('sqrt')}>√x</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('cbrt')}>∛x</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('root')}>ʸ√x</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('multiply')}>×</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('ln')}>ln</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('log')}>log</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('exp')}>eˣ</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('subtract')}>−</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('factorial')}>x!</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('reciprocal')}>1/x</button>
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('abs')}>|x|</button>
          <button className="calculator-btn bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-sm font-medium transition-colors" onClick={() => onOperator('add')}>+</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button className="calculator-btn bg-indigo-100 text-indigo-600 hover:bg-indigo-200 rounded-lg text-sm font-medium transition-colors" onClick={() => onFunction('e')}>e</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={() => onNumberInput('0')}>0</button>
          <button className="calculator-btn bg-white text-slate-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors shadow-sm border border-gray-200" onClick={onDecimal}>.</button>
          <button className="calculator-btn bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors" onClick={onEquals}>=</button>
        </div>
      </div>

      {/* Animation styles moved to index.css */}
    </div>
  );
}
