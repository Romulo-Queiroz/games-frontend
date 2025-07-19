import axios from 'axios';

export interface RecommendedGameDto {
  title: string;
  gameUrl: string;
}

interface Filters {
  genres: string[];
  platform: string;
  memory: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:44380'
});

export function getRecommendedGame(filters: Filters): Promise<RecommendedGameDto> {
  const params = new URLSearchParams();
  filters.genres.forEach(g => params.append('genres', g));
  params.append('platform', filters.platform);
  params.append('memory', String(filters.memory));
  return api
    .get<RecommendedGameDto>(`/api/games/compatible?${params.toString()}`)
    .then(res => res.data);
}
