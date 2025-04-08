import { useState, useEffect } from 'react';
import { getStoredHistory, clearHistory as clearStoredHistory, HistoryItem } from '@/lib/history';

export function useHistoryPanel() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    setHistory(getStoredHistory());
  }, []);

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
