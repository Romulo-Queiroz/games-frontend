import axios from 'axios';

export interface RecommendedGameDto {
  title: string;
  gameUrl: string;
  thumbnail: string;
  shortDescription: string;
}

interface Filters {
  genres: string[];
  platform: string;
  memory: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:44380'
});

export async function getRecommendedGame(filters: Filters): Promise<RecommendedGameDto> {
  const params = new URLSearchParams();
  filters.genres.forEach(g => params.append('genres', g));
  params.append('platform', filters.platform);
  params.append('memory', String(filters.memory));
  try {
    const res = await api.get<RecommendedGameDto>(`/api/games/compatible?${params.toString()}`);
    return res.data;
  } catch (err: any) {
    const backendMsg = err.response?.data || err.message || 'Erro desconhecido';
    throw { ...err, backendMsg };
  }
}
