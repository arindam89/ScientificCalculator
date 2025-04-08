export interface HistoryItem {
  calculation: string;
  result: string;
}

// Key used for storing in localStorage
const HISTORY_STORAGE_KEY = 'calculator_history';
const SETTINGS_STORAGE_KEY = 'calculator_settings';

// Maximum number of history items to store
const MAX_HISTORY_ITEMS = 50;

export function getStoredHistory(): HistoryItem[] {
  try {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!storedHistory) return [];
    return JSON.parse(storedHistory) as HistoryItem[];
  } catch (error) {
    console.error('Error loading history from localStorage:', error);
    return [];
  }
}

export function saveHistory(history: HistoryItem[]): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history to localStorage:', error);
  }
}

export function addHistoryItem(calculation: string, result: string): HistoryItem[] {
  const history = getStoredHistory();
  
  // Create new history item
  const newItem: HistoryItem = { calculation, result };
  
  // Add to beginning of array (newest first)
  const updatedHistory = [newItem, ...history];
  
  // Limit to maximum number of items
  const limitedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
  
  // Save to localStorage
  saveHistory(limitedHistory);
  
  return limitedHistory;
}

export function clearHistory(): HistoryItem[] {
  saveHistory([]);
  return [];
}

// Settings storage
export interface CalculatorSettings {
  isDegrees: boolean;
  memory: number;
}

export function getStoredSettings(): CalculatorSettings {
  try {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!storedSettings) {
      return { isDegrees: true, memory: 0 };
    }
    return JSON.parse(storedSettings) as CalculatorSettings;
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    return { isDegrees: true, memory: 0 };
  }
}

export function saveSettings(settings: CalculatorSettings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
}
