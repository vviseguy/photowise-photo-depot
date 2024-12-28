const dummyData = {
    metadata: [
      {
        id: 1,
        title: "Project Alpha",
        size: "20 MB",
        files: 10,
        lastAccessed: "2024-12-20",
      },
      {
        id: 2,
        title: "Project Beta",
        size: "15 MB",
        files: 8,
        lastAccessed: "2024-12-18",
      },
      {
        id: 3,
        title: "Project Gamma",
        size: "50 MB",
        files: 25,
        lastAccessed: "2024-12-15",
      },
    ],
    photos: {
      1: Array.from(
        { length: 20 },
        (_, i) => `https://picsum.photos/150?project=1&random=${i}`
      ),
      2: Array.from(
        { length: 15 },
        (_, i) => `https://picsum.photos/150?project=2&random=${i}`
      ),
      3: Array.from(
        { length: 25 },
        (_, i) => `https://picsum.photos/150?project=3&random=${i}`
      ),
    },
  };
  
  let metadataCache = null;
  let photoCache = {};
  
  async function fetchMetadata() {
    if (!metadataCache) {
      console.log("Fetching metadata from server...");
      metadataCache = dummyData.metadata;
    }
    return metadataCache;
  }
  
  async function fetchLowQualityImages(projectId) {
    if (!photoCache[projectId]) {
      console.log(`Fetching photos for project ${projectId} from server...`);
      photoCache[projectId] = dummyData.photos[projectId];
    }
    return photoCache[projectId];
  }
  
  export { fetchMetadata, fetchLowQualityImages };
  
  