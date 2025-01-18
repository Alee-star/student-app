import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./classSlice";

const store = configureStore({
  reducer: {
    classes: classReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
