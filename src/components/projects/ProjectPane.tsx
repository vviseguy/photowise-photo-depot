// ProjectPane.tsx
import React, { useEffect, useState } from 'react';

import { usePane } from '../../context/PaneContext';
import { Project } from '../../types/types';
import { useAuth } from '../../context/AuthContext';

interface ProjectPaneProps {
  project: Project;
}

export const ProjectPane: React.FC<ProjectPaneProps> = ({ project }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const { closePane } = usePane();
  const {projectService} = useAuth()

  useEffect(() => {
    (async () => {
      const data = await projectService.fetchLowQualityImages(project.id);
      setPhotos(data);
    })();
  }, [project.id]);

  return (
    <div>
      <button onClick={closePane}>Close</button>
      <h2>{project.title}</h2>
      <p>Size: {project.size} | Files: {project.fileCount}</p>
      {photos.map((src, i) => (
        <img key={i} src={src} alt={project.title} />
      ))}
    </div>
  );
};
