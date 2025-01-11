// PaneContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PaneContextValue {
  isOpen: boolean;
  content: React.ReactNode | null;
  openPane: (paneContent: React.ReactNode) => void;
  closePane: () => void;
}

const PaneContext = createContext<PaneContextValue>({
  isOpen: false,
  content: null,
  openPane: () => {},
  closePane: () => {},
});

export const PaneProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openPane = (paneContent: React.ReactNode) => {
    setContent(paneContent);
    setIsOpen(true);
  };

  const closePane = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <PaneContext.Provider value={{ isOpen, content, openPane, closePane }}>
      {children}
    </PaneContext.Provider>
  );
};

export const usePane = () => useContext(PaneContext);
