// services/ProjectService.ts

import { Project, DummyData, ProjectMetadataDao } from "../types/types";

class ProjectService {
    private metadataCache: Project[] | null = null;
    private photoCache: Record<string, string[]> = {};
    private readonly dummyData: DummyData = {
        metadata: [
            // ... (your metadata entries)
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
    private token: string | null;
    private readonly apiEndpoint = "https://f6937s1abf.execute-api.us-west-2.amazonaws.com/default/getMetadata";


    constructor(token: string | null) {
        this.token = token
        // Initialize caches if necessary
    }

    public setAccessToken(token: string | null) {
        this.token = token
    }


    // /**
    //  * Converts raw dummy metadata to ProjectMetadata format.
    //  */
    // private convertDummyData(): Project[] {
    //     return this.dummyData.metadata.map((item, index) => ({
    //         id: String(index),
    //         title: item.title,
    //         size: item.size,
    //         files: item.files,
    //         shootDate: new Date().toISOString(), // Placeholder logic
    //         lastModified: new Date(item.lastAccessed).toISOString(),
    //     }));
    // }

    /**
     * Fetches project metadata, utilizing cache if available.
     */
    public async fetchMetadata(): Promise<Project[] | null> {
        if (this.metadataCache) {
            console.log("Using cached metadata.");
            return this.metadataCache;
        }

        if (!this.token) {
            throw new Error("No access token available. Please log in.");
        }

        try {
            console.log("Fetching metadata from server...");
            const response = await fetch(this.apiEndpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            const data: { items: ProjectMetadataDao[] } = await response.json();
            this.metadataCache = data.items.map((item) => Project.fromDao(item));
            return this.metadataCache;
        } catch (err) {
            console.error("Failed to fetch metadata:", err);
            throw new Error("Failed to fetch metadata.");
        }
    }

    /**
     * Fetches low-quality images for a given project ID, utilizing cache if available.
     * @param projectId - The ID of the project.
     */
    public async fetchLowQualityImages(projectId: string): Promise<string[]> {
        if (this.photoCache[projectId]) {
            console.log(`Returning cached photos for project ID: ${projectId}`);
            return this.photoCache[projectId];
        }

        console.log(`Fetching photos for project ID: ${projectId} from dummy data...`);
        const project = this.metadataCache?.find((p) => p.id === projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found.`);
        }

        const projectTitle = project.title;
        const photos = this.dummyData.photos[projectTitle] || [];
        this.photoCache[projectId] = photos;

        return photos;
    }

    /**
     * Clears the metadata cache.
     */
    public clearMetadataCache(): void {
        this.metadataCache = null;
    }

    /**
     * Clears the photo cache for a specific project or all projects.
     * @param projectId - (Optional) The ID of the project to clear cache for.
     */
    public clearPhotoCache(projectId?: string): void {
        if (projectId) {
            delete this.photoCache[projectId];
        } else {
            this.photoCache = {};
        }
    }
}

export default ProjectService;
