import type { FC } from 'react'; 
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';

interface GameResultProps {
  game: { title: string; 
  gameUrl: string; thumbnail: string;
  shortDescription: string; } | null;
  error: string;
}

const GameResult: FC<GameResultProps> = ({ game, error }) => {
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  if (!game) return null;

  return (
   <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardMedia
        component="img"
        height="200"
        image={game.thumbnail}
        alt={game.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {game.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {game.shortDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component="a"
          href={game.gameUrl}
          target="_blank"
        >
          Adquira já!
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameResult;
