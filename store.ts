import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./reducers/alert";

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
