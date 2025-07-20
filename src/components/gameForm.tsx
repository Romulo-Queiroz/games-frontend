import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Paper } from '@mui/material';

interface GameFormProps {
  onSearch: (filters: {
    genres: string[];
    platform: string;
    memory: number;
  }) => void;
    loading: boolean;
}

const GameForm: FC<GameFormProps> = ({ onSearch, loading }) => {
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
    <Paper
      elevation={4}
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
      <Box component="form" onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Gêneros (vírgula)"
            placeholder="Ex: Shooter, Strategy"
            value={genresText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setGenresText(e.target.value)}
            disabled={loading}
          />

          <TextField
            select
            fullWidth
            label="Plataforma"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            disabled={loading}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pc">PC</MenuItem>
            <MenuItem value="browser">Browser</MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Memória (GB)"
            value={memory}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMemory(e.target.value)}
            inputProps={{ min: 1 }}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ height: 56 }}
          >
            {loading
              ? <CircularProgress size={24} color="inherit" />
              : 'Buscar Jogo'
            }
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default GameForm;
