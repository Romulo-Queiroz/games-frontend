import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { getRecommendedGame, type RecommendedGameDto } from './api/gamesApi';
import BackgroundVideo from './components/BackgroundVideo';
import GameForm from './components/gameForm';
import GameResult from './components/gameResult';

function App() {
  const [game, setGame]   = useState<RecommendedGameDto | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleSearch = async (filters: {
    genres: string[];
    platform: string;
    memory: number;
  }) => {
    setError('');
    setGame(null);
    setLoading(true);
    try {
      const data = await getRecommendedGame(filters);
      setGame(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError(err.response.data as string);
      } else {
        setError('Erro ao buscar o jogo. Tente novamente.');
      }
    } finally {
    setLoading(false);
    }
  };

  return (
    <>
      <BackgroundVideo />

      <Container sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: 'common.white',
            textShadow: '0 4px 12px rgba(0,0,0,0.7)',
            fontWeight: 'bold',
            mb: 4,
          }}
        >
          Recomendador de Jogos
        </Typography>

        <GameForm
        onSearch={handleSearch}
        loading={loading}
      />
        <GameResult game={game} error={error} />
      </Container>
    </>
  );
};

export default App;
