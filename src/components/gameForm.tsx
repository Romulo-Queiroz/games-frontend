import { useState } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Paper } from '@mui/material';
import ErrorDialog from './ErrorDialog';
import Alert from '@mui/material/Alert';
interface GameFormProps {
  onSearch: (filters: {
    genres: string[];
    platform: string;
    memory: number;
  }) => void;
  loading: boolean;
  error?: string;
}

const GameForm: FC<GameFormProps> = ({ onSearch, loading, error }) => {
  const [genresText, setGenresText] = useState<string>('');
  const [platform, setPlatform] = useState<'all' | 'pc' | 'browser'>('all');
  const [memory, setMemory] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg]   = useState('');
  const handleClose = () => setDialogOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const genres = genresText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
      const memNum = Number(memory);
    const memoryGb = parseInt(memory, 10);
    if (!genres.length) {
      setDialogMsg('Por favor, informe ao menos um gênero.');
      setDialogOpen(true);
      return;
    }
    if (isNaN(memNum) || memNum <= 0) {
      setDialogMsg('Por favor, informe uma quantidade de memória válida (>0).');
      setDialogOpen(true);
      return;
    }
    onSearch({ genres, platform, memory: memoryGb });
  };

 return (
  <>
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
            label="Gêneros"
            placeholder="Ex: Shooter, Strategy"
            value={genresText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setGenresText(e.target.value)}
            disabled={loading}
          />
          {error && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="warning">{error}</Alert>
            </Box>
          )}
         
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

    <ErrorDialog
       open={dialogOpen}
       message={dialogMsg}
       onClose={handleClose}
     />
    </>

  );
};

export default GameForm;
