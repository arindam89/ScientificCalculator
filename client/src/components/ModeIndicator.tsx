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
    <div className="flex justify-between text-xs text-gray-500 px-4 pb-2">
      <div>
        <span 
          onClick={toggleDegRad}
          className="cursor-pointer hover:text-primary transition-colors"
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
