import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  successMessage: string | null;
  warningMessage: string | null;
  errorMessage: string | null;
}

const initialState: State = {
  successMessage: null,
  warningMessage: null,
  errorMessage: null
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    reset: () => initialState,
    setSuccess: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    setWarning: (state, action: PayloadAction<string>) => {
      state.warningMessage = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    }
  }
});
