import React from 'react';
import { ArchiveButton } from './button/ArchiveButton';
import { ShareButton } from './button/ShareButton';
import { DownloadButton } from './button/DownloadButton';
import './SlideDownBar.css';

interface SlideDownBarProps {
  selectedCount: number;
  onArchiveAll: () => void;
  onShareAll: () => void;
  onDownloadAll: () => void;
}

export const SlideDownBar: React.FC<SlideDownBarProps> = ({
  selectedCount,
  onArchiveAll,
  onShareAll,
  onDownloadAll,
}) => {
  const shownClass = selectedCount === 0 ? '' : 'show';

  return (
    <div className={`slide-down-container ${shownClass}`}>
      <div className="slide-down-bar">
        <div className="selected-count">{selectedCount} Selected</div>
        <ArchiveButton onArchive={onArchiveAll} />
        <ShareButton onShare={onShareAll} />
        <DownloadButton onDownload={onDownloadAll} />
      </div>
    </div>
  );
};
