import { useState, useEffect, useCallback } from 'react';
import type { SearchResult } from './types';

export const useSearch = (delay: number = 300) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Replace with your actual API call
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchProducts(searchTerm);
      } else {
        setResults([]);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, delay, searchProducts]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error,
    clearSearch: () => setSearchTerm('')
  };
};