// ArchiveButton.tsx
import React from 'react';
import { ProjectActionButton } from './ProjectActionButton';

interface ArchiveButtonProps {
  onArchive: () => void;
}

export const ArchiveButton: React.FC<ArchiveButtonProps> = ({ onArchive }) => {
  return (
    <ProjectActionButton
      onClick={onArchive}
      iconClass="fa-solid fa-box-archive"
      label="Archive"
    />
  );
};
