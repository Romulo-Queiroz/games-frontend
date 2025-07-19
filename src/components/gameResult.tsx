import type { FC } from 'react';

interface GameResultProps {
  game: { title: string; gameUrl: string } | null;
  error: string;
}

const GameResult: FC<GameResultProps> = ({ game, error }) => {
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  if (!game) {
    return null;
  }
  return (
    <div>
      <h2>Jogo recomendado:</h2>
      <p><strong>{game.title}</strong></p>
      <a href={game.gameUrl} target="_blank" rel="noopener noreferrer">
        Abrir no FreeToGame
      </a>
    </div>
  );
};

export default GameResult;
