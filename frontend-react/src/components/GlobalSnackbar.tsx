import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeMessage } from '../store/Snackbar/SnackbarSlice';

const GlobalSnackbar: React.FC = () => {
  const messages = useSelector((state: RootState) => state.snackbar.messages);
  const dispatch = useDispatch();

  return (
    <>
      {messages.map(({ id, text, severity }) => (
        <Snackbar
          key={id}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open
          autoHideDuration={3000}
          onClose={() => dispatch(removeMessage(id))}
        >
          <Alert
            onClose={() => dispatch(removeMessage(id))}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default GlobalSnackbar;
