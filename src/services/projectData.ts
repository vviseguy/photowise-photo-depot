// projectData.ts

// Dummy data interface
interface DummyData {
    metadata: Array<{
      title: string;
      size: string;
      files: number;
      lastAccessed: string;
    }>;
    photos: Record<string, string[]>;
  }
  // Final data shape
  export interface ProjectData {
    id: string;
    title: string;
    size: string;
    shootDate: string;
    lastModified: string;
    files: number;
  }
  
  // Dummy data definition
  const dummyData: DummyData = {
    metadata: [
        {
          title: "Project Alpha",
          size: "20 MB",
          files: 10,
          lastAccessed: "2024-12-20",
        },
        {
          title: "Project Beta",
          size: "15 MB",
          files: 8,
          lastAccessed: "2024-12-18",
        },
        {
          title: "Project Gamma",
          size: "50 MB",
          files: 25,
          lastAccessed: "2024-12-15",
        },
        {
          title: "Project Alpha",
          size: "20 MB",
          files: 10,
          lastAccessed: "2024-12-20",
        },
        {
          title: "Project Beta",
          size: "15 MB",
          files: 8,
          lastAccessed: "2024-12-18",
        },
        {
          title: "Project Gamma",
          size: "50 MB",
          files: 25,
          lastAccessed: "2024-12-15",
        },
        {
          title: "Project Alpha",
          size: "20 MB",
          files: 10,
          lastAccessed: "2024-12-20",
        },
        {
          title: "Project Beta",
          size: "15 MB",
          files: 8,
          lastAccessed: "2024-12-18",
        },
        {
          title: "Project Gamma",
          size: "50 MB",
          files: 25,
          lastAccessed: "2024-12-15",
        },
        {
          title: "Project Alpha",
          size: "20 MB",
          files: 10,
          lastAccessed: "2024-12-20",
        },
        {
          title: "Project Beta",
          size: "15 MB",
          files: 8,
          lastAccessed: "2024-12-18",
        },
        {
          title: "Project Gamma",
          size: "50 MB",
          files: 25,
          lastAccessed: "2024-12-15",
        },
        {
          title: "Project Alpha",
          size: "20 MB",
          files: 10,
          lastAccessed: "2024-12-20",
        },
        {
          title: "Project Beta",
          size: "15 MB",
          files: 8,
          lastAccessed: "2024-12-18",
        },
        {
          title: "Project Gamma",
          size: "50 MB",
          files: 25,
          lastAccessed: "2024-12-15",
        },
        {
          title: "Project Alpha",
          size: "20 MB",
          files: 10,
          lastAccessed: "2024-12-20",
        },
        {
          title: "Project Beta",
          size: "15 MB",
          files: 8,
          lastAccessed: "2024-12-18",
        },
        {
          title: "Project Gamma",
          size: "50 MB",
          files: 25,
          lastAccessed: "2024-12-15",
        },
    ],
    photos: {
      "Project Alpha": Array.from(
        { length: 20 },
        (_, i) => `https://picsum.photos/150?project=1&random=${i}`
      ),
      "Project Beta": Array.from(
        { length: 15 },
        (_, i) => `https://picsum.photos/150?project=2&random=${i}`
      ),
      "Project Gamma": Array.from(
        { length: 25 },
        (_, i) => `https://picsum.photos/150?project=3&random=${i}`
      ),
    },
  };
  
  // Basic cache
  let metadataCache: ProjectData[] | null = null;
  const photoCache: Record<number, string[]> = {};
  
  // Convert our dummy metadata to ProjectData shape
  function convertDummyData(): ProjectData[] {
    return dummyData.metadata.map((item, index) => ({
      id:  String(index),
      title: item.title,
      size: item.size,
      files: item.files,
      shootDate: new Date().toISOString(),
      lastModified: new Date(item.lastAccessed).toISOString(),
    }));
  }
  
  // Fetch metadata (dummy only)
  export async function fetchMetadata(): Promise<ProjectData[]> {
    if (!metadataCache) {
      console.log("Using dummy metadata...");
      metadataCache = convertDummyData();
    }
    return metadataCache;
  }
  
  // Fetch images (dummy only)
  export async function fetchLowQualityImages(projectId: number): Promise<string[]> {
    if (!photoCache[projectId]) {
      console.log(`Using dummy photos for project ID: ${projectId}`);
      // Match by ID in metadata cache:
      // If you want a better mapping, adapt logic below as needed.
      const projectTitle = metadataCache?.[projectId]?.title || "Project Alpha";
      photoCache[projectId] = dummyData.photos[projectTitle] || [];
    }
    return photoCache[projectId];
  }
  