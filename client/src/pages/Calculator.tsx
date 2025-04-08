import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import CalculatorDisplay from "@/components/CalculatorDisplay";
import CalculatorKeypad from "@/components/CalculatorKeypad";
import HistoryPanel from "@/components/HistoryPanel";
import MemoryFunctions from "@/components/MemoryFunctions";
import ModeIndicator from "@/components/ModeIndicator";
import { useCalculator } from "@/hooks/useCalculator";
import { useHistoryPanel } from "@/hooks/useHistoryPanel";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { History } from "@/lib/history";

export default function Calculator() {
  const {
    currentValue,
    previousCalculation,
    memory,
    errorMessage,
    isDegrees,
    activeTab,
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
    hasMemory,
  } = useCalculator();

  const { 
    isHistoryOpen, 
    toggleHistory, 
    history, 
    clearHistory, 
    handleHistoryItemClick 
  } = useHistoryPanel();

  // Setup keyboard input handling
  useKeyboardInput({
    handleNumberInput,
    handleOperator,
    handleDecimal,
    handleEquals,
    handleClear,
    handleBackspace,
    handlePercent,
    toggleHistory,
    toggleDegRad,
  });

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 flex flex-col items-center justify-center font-sans">
      <div className="container px-4 max-w-md">
        <Card className="overflow-hidden border border-gray-200 rounded-3xl shadow-xl">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-700">Scientific Calculator</h1>
            <button
              onClick={toggleHistory}
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="Show history"
            >
              <i className="text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </i>
            </button>
          </div>

          {/* Main Calculator Container */}
          <div className="calculator-container relative">
            {/* Display Area */}
            <CalculatorDisplay
              currentValue={currentValue}
              previousCalculation={previousCalculation}
              errorMessage={errorMessage}
            />

            {/* Mode Indicator (DEG/RAD and Memory) */}
            <ModeIndicator
              isDegrees={isDegrees}
              toggleDegRad={toggleDegRad}
              hasMemory={hasMemory}
            />

            {/* Memory Functions */}
            <MemoryFunctions onMemoryOperation={handleMemoryOperation} />

            {/* Calculator Keypad */}
            <CalculatorKeypad
              activeTab={activeTab}
              switchTab={switchTab}
              onNumberInput={handleNumberInput}
              onOperator={handleOperator}
              onEquals={handleEquals}
              onClear={handleClear}
              onBackspace={handleBackspace}
              onDecimal={handleDecimal}
              onToggleSign={handleToggleSign}
              onPercent={handlePercent}
              onFunction={handleFunction}
            />

            {/* History Panel */}
            <HistoryPanel
              isOpen={isHistoryOpen}
              closeHistory={toggleHistory}
              history={history}
              clearHistory={clearHistory}
              onHistoryItemClick={handleHistoryItemClick}
            />
          </div>
        </Card>

        {/* Calculator Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>All calculations performed client-side. Your history is stored locally.</p>
          <p className="mt-1">
            Press <kbd className="bg-gray-200 px-1 py-0.5 rounded text-xs">Esc</kbd> to clear or{" "}
            <kbd className="bg-gray-200 px-1 py-0.5 rounded text-xs">Enter</kbd> to calculate.
          </p>
        </div>
      </div>
    </div>
  );
}
