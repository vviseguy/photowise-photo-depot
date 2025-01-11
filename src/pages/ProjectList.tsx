// ProjectList.tsx
import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../components/projects/ProjectItem';
import { SlideDownBar } from '../components/projects/SlideDownBar';
import { Project } from '../types/types';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

export const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMultiSelectEnabled, setIsMultiSelectEnabled] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { query } = useSearch();
  
  const {projectService} = useAuth();

  // Fetch your data
  useEffect(() => {
    (async () => {
      const data = await projectService.fetchMetadata();
      if (data)
        setProjects(data);
    })();
  }, []);

  // Turn off multi-select if no items are selected
  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsMultiSelectEnabled(false);
    }
  }, [selectedIds]);

  // Enables multi-select and selects the given ID
  const handleEnableMultiSelect = (id: string) => {
    setIsMultiSelectEnabled(true);
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // Toggle the selection of the given ID
  const handleSelectChange = (id: string, checked: boolean) =>
    setSelectedIds((prev) =>
      checked ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id)
    );
  
  // Bulk actions
  const handleArchiveAll = () => {
    alert(`Archive all selected: ${selectedIds.join(', ')}`);
  };
  const handleShareAll = () => {
    alert(`Share all selected: ${selectedIds.join(', ')}`);
  };
  const handleDownloadAll = () => {
    alert(`Download all selected: ${selectedIds.join(', ')}`);
  };

  // Filter by search query
  const filteredProjects = projects.filter((proj) =>
    proj.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SlideDownBar
        selectedCount={selectedIds.length}
        onArchiveAll={handleArchiveAll}
        onShareAll={handleShareAll}
        onDownloadAll={handleDownloadAll}
      />

      <div id="project-list">
        {filteredProjects.map((proj) => (
          <ProjectItem
            key={proj.id}
            project={proj}
            isMultiSelectEnabled={isMultiSelectEnabled}
            isSelected={selectedIds.includes(proj.id)}  // <-- Controlled by parent
            onSelectChange={handleSelectChange}        // <-- Parent callback
            onEnableMultiSelect={handleEnableMultiSelect}
          />
        ))}
      </div>
    </>
  );
};
