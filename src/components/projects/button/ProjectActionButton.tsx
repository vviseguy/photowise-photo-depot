// ProjectActionButton.tsx
import React from 'react';
import "../../../assets/theme.css"
import "./ProjectActionButton.css"

interface ProjectActionButtonProps {
  onClick: () => void;
  iconClass: string;
  label: string;
  theme?: 'light' | 'dark';
}

export const ProjectActionButton: React.FC<ProjectActionButtonProps> = ({
  onClick,
  iconClass,
  label,
  theme = 'dark',
}) => {
  return (
    <button
      onClick={onClick}
      className={`project-action-button ${theme}`}
      aria-label={label}
    >
      <i className={iconClass} />
    </button>
  );
};
