import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  messages: {
    id: number;
    text: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }[];
}

const initialState: SnackbarState = {
  messages: [],
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        text: string;
        severity: 'success' | 'error' | 'warning' | 'info';
      }>
    ) => {
      state.messages.push({ id: Date.now(), ...action.payload });
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage } = snackbarSlice.actions;
export default snackbarSlice.reducer;
