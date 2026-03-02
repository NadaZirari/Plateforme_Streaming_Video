export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export type ContentType = 'FILM' | 'SERIE' | 'DOCUMENTAIRE';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  trailerUrl: string;
  duration: string;
  releaseYear: number;
  type: ContentType;
  category: string;
  rating: number;
  director: string;
  cast: string[];
}

export interface WatchlistEntry {
  id: string;
  userId: string;
  videoId: string;
  addedAt: string;
}

export interface WatchHistoryEntry {
  id: string;
  userId: string;
  videoId: string;
  watchedAt: string;
  progressTime: number; // in seconds
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
}
