import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { getRecommendedGame, type RecommendedGameDto } from './api/gamesApi';
import GameForm from './components/gameForm';
import GameResult from './components/gameResult';

function App() {
  // Estado para o jogo recomendado e erro
  const [game, setGame] = useState<RecommendedGameDto | null>(null);
  const [error, setError] = useState<string>('');

  // Função que chama a API e atualiza estados
  const handleSearch = async (filters: { genres: string[]; platform: string; memory: number }) => {
    setError('');
    setGame(null);
    try {
      const data = await getRecommendedGame(filters);
      setGame(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError(err.response.data as string);
      } else {
        setError('Erro ao buscar o jogo. Tente novamente.');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" sx={{ mt: 4 }}>
        Recomendador de Jogos
      </Typography>
      <GameForm onSearch={handleSearch} />
      <GameResult game={game} error={error} />
    </Container>
  );
}

export default App;
