// ProjectItem.tsx
import React, { useRef } from 'react';
import { ProjectPane } from './ProjectPane';
import { usePane } from '../../context/PaneContext';
import { ArchiveButton } from './button/ArchiveButton';
import { ShareButton } from './button/ShareButton';
import { DownloadButton } from './button/DownloadButton';
import './ProjectItem.css';
import { Project } from '../../types/types';
import Checkbox from '../Checkbox';

interface ProjectItemProps {
  project: Project;
  isMultiSelectEnabled: boolean;
  isSelected: boolean;
  onSelectChange: (id: string, checked: boolean) => void;
  onEnableMultiSelect: (id: string) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isMultiSelectEnabled,
  isSelected,
  onSelectChange,
  onEnableMultiSelect,
}) => {
  const { openPane } = usePane();
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressFired = useRef(false);

  // Trigger multi-select on long press
  const handleMouseDown = () => {
    longPressFired.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      onEnableMultiSelect(project.id);
    }, 500);
  };

  // Normal click: either toggle selection (multi-select) or open project (single-select)
  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (!longPressFired.current) {
      if (isMultiSelectEnabled) {
        onSelectChange(project.id, !isSelected);
      } else {
        openPane(<ProjectPane project={project} />);
      }
    }
  };

  return (
    <div
      className="project-item"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {isMultiSelectEnabled && (
        <Checkbox
          checked={isSelected} // <-- Controlled by ProjectList
          // When checkbox is clicked, call parent
          onChange={(checked) => onSelectChange(project.id, checked)}
        />
      )}

      <div className="project-title-area">
        <div className="project-title-large">{project.title}</div>
        <div className="project-meta">
          Last Updated: {project.lastModified} | Files: {project.fileCount} | Size: {project.size}
        </div>
      </div>

      <div className="project-actions">
        <ArchiveButton onArchive={() => {/* your archive logic */}} />
        <ShareButton onShare={() => {/* your share logic */}} />
        <DownloadButton onDownload={() => {/* your download logic */}} />
      </div>
    </div>
  );
};
