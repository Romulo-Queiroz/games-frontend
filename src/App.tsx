import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { getRecommendedGame, type RecommendedGameDto } from './api/gamesApi';
import BackgroundVideo from './components/BackgroundVideo';
import GameForm from './components/gameForm';
import GameResult from './components/gameResult';
import { Box } from '@mui/material';


function App() {
  const [game, setGame]   = useState<RecommendedGameDto | null>(null);
  const games = game ? [game] : [];
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
          fontFamily: '"Press Start 2P", cursive',
          fontSize: { xs: '1.5rem', md: '2.5rem' },
          color: 'common.white',
          textShadow: '0 4px 12px rgba(0,0,0,0.7)',
          fontWeight: 'normal',
          mb: 4,
          letterSpacing: '.1em'
        }}
      >
        RECOMENDADOR DE JOGOS
      </Typography>

        {game
          ? (
            <Box
               sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'stretch',   // estica os filhos para a mesma altura
                gap: 4,
                mt: 4,
              }}
            >
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <GameForm
                  onSearch={handleSearch}
                  loading={loading}
                />
              </Box>

              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <GameResult game={game} error={error} />
              </Box>
            </Box>
          )
          : (
            <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
            <Box sx={{ width: '100%', maxWidth: 700 }}>
              <GameForm onSearch={handleSearch} loading={loading} />
            </Box>
          </Box>
          )
        }
      </Container>
    </>
  );
};

export default App;
