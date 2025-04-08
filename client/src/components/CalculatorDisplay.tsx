interface CalculatorDisplayProps {
  currentValue: string;
  previousCalculation: string;
  errorMessage: string | null;
}

export default function CalculatorDisplay({
  currentValue,
  previousCalculation,
  errorMessage,
}: CalculatorDisplayProps) {
  return (
    <div className="px-4 pt-4 pb-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/90">
      {/* Previous Calculation */}
      <div className="h-6 text-sm text-gray-500 dark:text-gray-400 font-mono overflow-x-auto whitespace-nowrap" style={{ 
        textAlign: "right",
        direction: "ltr",
        scrollbarWidth: "none",
      }}>
        {previousCalculation}
      </div>
      
      {/* Current Input/Result */}
      <div className="h-14 text-3xl font-semibold text-slate-900 dark:text-slate-50 font-mono overflow-x-auto whitespace-nowrap" style={{ 
        textAlign: "right",
        direction: "ltr",
        scrollbarWidth: "none",
      }}>
        {currentValue}
      </div>
      
      {/* Error Message */}
      <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400 mb-1">
        {errorMessage && (
          <span className="text-red-500 dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}
