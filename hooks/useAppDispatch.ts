import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

// Custom hook to use the AppDispatch type with useDispatch
// This ensures that the dispatch function is correctly typed
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
