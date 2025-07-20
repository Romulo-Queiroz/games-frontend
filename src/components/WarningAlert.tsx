import type { FC } from 'react';
import { Alert, Box } from '@mui/material';

interface WarningAlertProps {
  message: string;
}

const WarningAlert: FC<WarningAlertProps> = ({ message }) => (
  <Box sx={{ width: '100%', mt: 2 }}>
    <Alert severity="warning">{message}</Alert>
  </Box>
);

export default WarningAlert;
