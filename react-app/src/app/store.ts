import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { modeReducer } from '../mode/slice';
import { sessionListener, sessionReducer } from '../testbed/slice';

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    mode: modeReducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(sessionListener.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >