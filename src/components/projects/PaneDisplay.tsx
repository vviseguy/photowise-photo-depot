// PaneDisplay.tsx
import React from 'react';
import { usePane } from '../../context/PaneContext';

export const PaneDisplay: React.FC = () => {
  const { isOpen, content, closePane } = usePane();
  if (!isOpen) return null;

  return (
    <div
      className="pane-overlay"
      onClick={closePane}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
      }}
    >
      <div
        className="pane"
        onClick={(e) => e.stopPropagation()}
        style={{
          margin: 'auto',
          background: '#fff',
          padding: '20px',
          maxHeight: '80%',
          width: '80%',
          overflowY: 'auto',
        }}
      >
        {content}
      </div>
    </div>
  );
};
