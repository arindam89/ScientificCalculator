type MemoryOperation = 'MC' | 'MR' | 'M+' | 'M-' | 'MS';

interface MemoryFunctionsProps {
  onMemoryOperation: (operation: MemoryOperation) => void;
}

export default function MemoryFunctions({ onMemoryOperation }: MemoryFunctionsProps) {
  const memoryButtons: { label: MemoryOperation; action: MemoryOperation }[] = [
    { label: 'MC', action: 'MC' },
    { label: 'MR', action: 'MR' },
    { label: 'M+', action: 'M+' },
    { label: 'M-', action: 'M-' },
    { label: 'MS', action: 'MS' },
  ];

  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 p-2 sm:p-3 pt-2 sm:pt-3 pb-0 bg-gray-50 dark:bg-slate-800">
      {memoryButtons.map((button) => (
        <button
          key={button.label}
          className="calculator-btn bg-gray-200 text-slate-900 hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 rounded-lg text-xs sm:text-sm font-medium transition-colors h-7 sm:h-8"
          onClick={() => onMemoryOperation(button.action)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
