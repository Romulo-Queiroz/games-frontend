// src/components/GameForm.tsx
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface GameFormProps {
  onSearch: (filters: {
    genres: string[];
    platform: string;
    memory: number;
  }) => void;
}

export default function GameForm({ onSearch }: GameFormProps) {
  const [genresText, setGenresText] = useState<string>('');
  const [platform, setPlatform]     = useState<'all' | 'pc' | 'browser'>('all');
  const [memory, setMemory]         = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const genres = genresText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const memoryGb = parseInt(memory, 10);
    if (genres.length === 0 || isNaN(memoryGb) || memoryGb <= 0) {
      alert('Informe ao menos um gênero e memória > 0');
      return;
    }

    onSearch({ genres, platform, memory: memoryGb });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Gêneros (vírgula):</label>
        <input
          type="text"
          placeholder="Shooter, MMORPG..."
          value={genresText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setGenresText(e.target.value)}
        />
      </div>
      <div>
        <label>Plataforma:</label>
        <select
          value={platform}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setPlatform(e.target.value as 'all' | 'pc' | 'browser')
          }
        >
          <option value="all">All</option>
          <option value="pc">PC</option>
          <option value="browser">Browser</option>
        </select>
      </div>
      <div>
        <label>Memória (GB):</label>
        <input
          type="number"
          min="1"
          value={memory}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMemory(e.target.value)}
        />
      </div>
      <button type="submit">Buscar Jogo</button>
    </form>
  );
}
