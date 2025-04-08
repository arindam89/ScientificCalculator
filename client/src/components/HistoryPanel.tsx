import { type HistoryItem } from "@/lib/history";

interface HistoryPanelProps {
  isOpen: boolean;
  closeHistory: () => void;
  history: HistoryItem[];
  clearHistory: () => void;
  onHistoryItemClick: (item: HistoryItem) => void;
}

export default function HistoryPanel({
  isOpen,
  closeHistory,
  history,
  clearHistory,
  onHistoryItemClick,
}: HistoryPanelProps) {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out z-10"
      style={{ transform: isOpen ? 'translateX(0%)' : 'translateX(100%)' }}
    >
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700">Calculation History</h2>
        <button 
          onClick={closeHistory}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[400px]">
        {history.length > 0 ? (
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li 
                key={index}
                className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors rounded"
                onClick={() => onHistoryItemClick(item)}
              >
                <div className="text-sm text-gray-500">{item.calculation}</div>
                <div className="font-mono text-lg text-slate-900">{item.result}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p>No calculation history yet</p>
          </div>
        )}
        
        <button 
          onClick={clearHistory}
          className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
        >
          Clear History
        </button>
      </div>
    </div>
  );
}
