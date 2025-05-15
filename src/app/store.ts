import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import reportsReducer from '../features/reports/reportsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    reports: reportsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
