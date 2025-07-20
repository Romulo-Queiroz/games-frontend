import type { FC } from 'react'; // ✅ importa só o tipo
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from '@mui/material';

interface GameResultProps {
  game: { title: string; gameUrl: string } | null;
  error: string;
}

const GameResult: FC<GameResultProps> = ({ game, error }) => {
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  if (!game) return null;

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Jogo recomendado:
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {game.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} href={game.gameUrl} target="_blank">
          Adquira já!
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameResult;
