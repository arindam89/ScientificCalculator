import { useState, useEffect } from 'react';
import { getStoredHistory, clearHistory as clearStoredHistory, HistoryItem } from '@/lib/history';

// Custom event name (must match the one in history.ts)
const HISTORY_UPDATED_EVENT = 'calculator-history-updated';

export function useHistoryPanel() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => getStoredHistory());
  
  // Listen for history update events
  useEffect(() => {
    // Define the event handler
    const handleHistoryUpdate = () => {
      setHistory(getStoredHistory());
    };
    
    // Add event listener
    window.addEventListener(HISTORY_UPDATED_EVENT, handleHistoryUpdate);
    
    // Initial load
    setHistory(getStoredHistory());
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener(HISTORY_UPDATED_EVENT, handleHistoryUpdate);
    };
  }, []);
  
  // Also refresh history when opening the panel
  useEffect(() => {
    if (isHistoryOpen) {
      setHistory(getStoredHistory());
    }
  }, [isHistoryOpen]);

  // Toggle history panel visibility
  const toggleHistory = () => {
    setIsHistoryOpen(prev => !prev);
  };

  // Clear all history
  const clearHistory = () => {
    setHistory(clearStoredHistory());
  };

  // Handle clicking on a history item
  const handleHistoryItemClick = (item: HistoryItem) => {
    // This will be handled by the calculator component
    setIsHistoryOpen(false);
  };

  return {
    isHistoryOpen,
    toggleHistory,
    history,
    clearHistory,
    handleHistoryItemClick
  };
}
