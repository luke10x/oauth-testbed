import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { RootState as ModeRootState, modeReducer } from '../mode/slice';
import { RootState as SessionsRootState, sessionListener, sessionReducer } from '../testbed/slice';
export type RootState = ModeRootState & SessionsRootState
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
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >