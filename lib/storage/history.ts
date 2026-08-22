'use client';

import { HistoryItem, AnalysisResult, MessageSource } from '@/lib/types';

const STORAGE_KEY = 'messageguard_history';
const MAX_HISTORY_ITEMS = 20;

function getStorageSync(): HistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading history from storage:', error);
    return [];
  }
}

function setStorageSync(items: HistoryItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error writing history to storage:', error);
  }
}

export function getHistory(): HistoryItem[] {
  return getStorageSync();
}

export function saveAnalysis(
  message: string,
  source: MessageSource,
  result: AnalysisResult
): HistoryItem {
  const items = getStorageSync();

  const preview = message.substring(0, 100).replace(/\n/g, ' ');

  const newItem: HistoryItem = {
    id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    source,
    messagePreview: preview,
    riskLevel: result.riskLevel,
    result,
  };

  const updated = [newItem, ...items].slice(0, MAX_HISTORY_ITEMS);
  setStorageSync(updated);

  return newItem;
}

export function getAnalysisById(id: string): HistoryItem | undefined {
  const items = getStorageSync();
  return items.find((item) => item.id === id);
}

export function deleteAnalysis(id: string): void {
  const items = getStorageSync();
  const updated = items.filter((item) => item.id !== id);
  setStorageSync(updated);
}

export function clearHistory(): void {
  setStorageSync([]);
}
