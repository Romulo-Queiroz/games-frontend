import type { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface ErrorDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ErrorDialog: FC<ErrorDialogProps> = ({ open, message, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Atenção</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorDialog;
