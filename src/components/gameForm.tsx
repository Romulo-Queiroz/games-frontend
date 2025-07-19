import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface GameFormProps {
  onSearch: (filters: {
    genres: string[];
    platform: string;
    memory: number;
  }) => void;
}

const GameForm: FC<GameFormProps> = ({ onSearch }) => {
  const [genresText, setGenresText] = useState<string>('');
  const [platform, setPlatform] = useState<'all' | 'pc' | 'browser'>('all');
  const [memory, setMemory] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const genres = genresText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const memoryGb = parseInt(memory, 10);
    if (!genres.length || isNaN(memoryGb) || memoryGb <= 0) {
      alert('Informe gênero e memória > 0');
      return;
    }
    onSearch({ genres, platform, memory: memoryGb });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}
    >
      <Stack spacing={3}>
        <FormControl fullWidth>
          <FormLabel>Gêneros (vírgula)</FormLabel>
          <Input
            value={genresText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGenresText(e.target.value)
            }
            placeholder="Shooter, MMORPG..."
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Plataforma</FormLabel>
          <Select
            value={platform}
            onChange={(e: SelectChangeEvent) =>
              setPlatform(e.target.value as 'all' | 'pc' | 'browser')
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pc">PC</MenuItem>
            <MenuItem value="browser">Browser</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Memória (GB)</FormLabel>
          <Input
            type="number"
            value={memory}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMemory(e.target.value)
            }
            inputProps={{ min: 1 }}
          />
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Buscar Jogo
        </Button>
      </Stack>
    </Box>
  );
};

export default GameForm;
