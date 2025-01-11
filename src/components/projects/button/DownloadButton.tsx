// DownloadButton.tsx
import React from 'react';
import { ProjectActionButton } from './ProjectActionButton';

interface DownloadButtonProps {
  onDownload: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload }) => {
  return (
    <ProjectActionButton
      onClick={onDownload}
      iconClass="fa-solid fa-download"
      label="Download"
    />
  );
};
