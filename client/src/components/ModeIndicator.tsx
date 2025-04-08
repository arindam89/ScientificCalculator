interface ModeIndicatorProps {
  isDegrees: boolean;
  toggleDegRad: () => void;
  hasMemory: boolean;
}

export default function ModeIndicator({ 
  isDegrees, 
  toggleDegRad, 
  hasMemory 
}: ModeIndicatorProps) {
  return (
    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-4 py-2 h-8 bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center">
        <span 
          onClick={toggleDegRad}
          className="cursor-pointer hover:text-primary transition-colors font-medium"
        >
          {isDegrees ? 'DEG' : 'RAD'}
        </span>
        <span className={`ml-3 transition-opacity duration-300 ${hasMemory ? 'opacity-100' : 'opacity-0'}`}>
          M
        </span>
      </div>
      <div>
        {/* Space for error messages that are now in the display component */}
      </div>
    </div>
  );
}
