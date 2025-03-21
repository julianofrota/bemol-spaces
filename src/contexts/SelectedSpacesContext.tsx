import React, { createContext, useContext, useState, useCallback } from 'react';
import { MediaSpace } from '@/types';

interface SelectedSpacesContextType {
  selectedSpaces: MediaSpace[];
  addSpace: (space: MediaSpace) => void;
  removeSpace: (spaceId: string) => void;
  clearSpaces: () => void;
  isSpaceSelected: (spaceId: string) => boolean;
}

const SelectedSpacesContext = createContext<SelectedSpacesContextType | undefined>(undefined);

export function SelectedSpacesProvider({ children }: { children: React.ReactNode }) {
  const [selectedSpaces, setSelectedSpaces] = useState<MediaSpace[]>([]);

  const addSpace = useCallback((space: MediaSpace) => {
    setSelectedSpaces(prev => {
      if (prev.some(s => s.id === space.id)) return prev;
      return [...prev, space];
    });
  }, []);

  const removeSpace = useCallback((spaceId: string) => {
    setSelectedSpaces(prev => prev.filter(space => space.id !== spaceId));
  }, []);

  const clearSpaces = useCallback(() => {
    setSelectedSpaces([]);
  }, []);

  const isSpaceSelected = useCallback((spaceId: string) => {
    return selectedSpaces.some(space => space.id === spaceId);
  }, [selectedSpaces]);

  return (
    <SelectedSpacesContext.Provider 
      value={{ 
        selectedSpaces, 
        addSpace, 
        removeSpace, 
        clearSpaces,
        isSpaceSelected 
      }}
    >
      {children}
    </SelectedSpacesContext.Provider>
  );
}

export function useSelectedSpaces() {
  const context = useContext(SelectedSpacesContext);
  if (context === undefined) {
    throw new Error('useSelectedSpaces must be used within a SelectedSpacesProvider');
  }
  return context;
} 