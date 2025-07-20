import type { FC } from 'react'; 
import {
  alpha,
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
   <Card  elevation={4}
     sx={theme => ({
        p: 4,
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        mt: { xs: 6, md: 0 },
      })}
    
    >
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
          sx={{
              fontWeight: 'bold',
              color: 'primary.main',     
              textTransform: 'none',
              fontSize: '1rem'
            }}
  
        >
          Adquira já!
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameResult;
