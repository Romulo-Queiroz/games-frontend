import { useState } from 'react';
import GameForm from './components/gameForm';
import GameResult from './components/gameResult';
import { getRecommendedGame } from './api/gamesApi';  

interface Game {
  title: string;
  gameUrl: string;
}

function App() {
  const [game, setGame]   = useState<Game | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (filters: {
    genres: string[];
    platform: string;
    memory: number;
  }) => {
    setError('');
    setGame(null);
    try {
      const data = await getRecommendedGame(filters);
      setGame(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError(err.response.data);
      } else {
        setError('Erro ao buscar o jogo. Tente novamente.');
      }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>Recomendador de Jogos</h1>
      <GameForm onSearch={handleSearch} />
      <GameResult game={game} error={error} />
    </div>
  );
}

export default App;
