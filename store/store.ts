import { configureStore } from '@reduxjs/toolkit'

import formStateReducer from './formState'

export const store = configureStore({
  reducer: {
    formStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
