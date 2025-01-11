
// ShareButton.tsx
import React from 'react';
import { ProjectActionButton } from './ProjectActionButton';

interface ShareButtonProps {
  onShare: () => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ onShare }) => {
  return (
    <ProjectActionButton
      onClick={onShare}
      iconClass="fa-solid fa-share-nodes"
      label="Share"
    />
  );
};