import { formatSize } from "../utils/data";

// types.ts
export interface ProjectMetadataDao {
  id: string;
  title: string;
  bytes?: number;
  fileCount?: number;
  lastModified?: string;
  shareCode?: string;
  shootDate?:string
}

export class Project {
  id: string;
  title: string;
  size?: string;
  fileCount?: number;
  lastModified?: string;
  shareCode?: string;
  shootDate?: string;

  constructor(
    id: string,
    title: string,
    size?: string,
    fileCount?: number,
    lastModified?: string,
    shareCode?: string,
    shootDate?: string) {

    this.id = id
    this.title = title
    this.size = size
    this.fileCount = fileCount
    this.lastModified = lastModified
    this.shareCode = shareCode
    this.shootDate = shootDate
  }

  static fromDao(data: ProjectMetadataDao){
    return new Project(data.id,
      data.title,
      data.bytes ? formatSize(data.bytes) : undefined,
      data.fileCount,
      data.lastModified? new Date(data.lastModified).toISOString() : undefined,
      data.shootDate ? new Date(data.shootDate).toISOString() : undefined)
  }
}



export interface DummyData {
  metadata: Array<{
    title: string;
    size: string;
    files: number;
    lastAccessed: string;
  }>;
  photos: Record<string, string[]>;
}