import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SessionAuthentication {
  state: "editable" | "waitingForPkce" | "dipatched" | "completed"
}
export interface Session {
  id: number;
  stateString: string
  codeVerifier: string
  accessToken?: string
}

export interface SessionsState {
  loading: boolean
  sessions: Array<Session>
  redirect?: {
    code: string
    state: string
  }
}

export const initialState: SessionsState = {
  loading: true,
  sessions: []
};

export const fetchSessionsThunk = createAsyncThunk(
  `session/fetchSessions`, async (): Promise<Session[]> => {
    await new Promise((res) => setTimeout(() => res("p1"), 1000))

    const data = sessionStorage.getItem('my-sessions')
    if (data === null) return [];
    return JSON.parse(data)
  });

interface AddSessionPayload {
  codeVerifier: string
  stateString: string 
}

interface AddCodeFromRedirectPayload {
  code: string
  state: string
}

interface AttachTokenPayload {
  sessionState: string
  accessToken: string
}

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<AddSessionPayload>) => {
      const id = state.sessions.length + 1
      state.sessions.push({ id, ...action.payload})
    },
    addCodeFromRedirect: (state, action: PayloadAction<AddCodeFromRedirectPayload>) => {
      state.redirect = action.payload
    },
    attachToken: (state, action: PayloadAction<AttachTokenPayload>) => {
      const len = state.sessions.length
      for (let i = 0; i < len; i++) {
        if (state.sessions[i].stateString == action.payload.sessionState) {
          state.sessions[i].accessToken = action.payload.accessToken  
        }
      }
    },
    restoreSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchSessionsThunk.pending, (state, action) => {
    //   state.loading = true
    //   state.sessions = []
    //   return state
    // })
    // builder.addCase(fetchSessionsThunk.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.sessions = action.payload
    //   return state
    // })
  },
});

export const addSession = sessionsSlice.actions.addSession
export const restoreSessions = sessionsSlice.actions.restoreSessions
export const attachToken = sessionsSlice.actions.attachToken
export const addCodeFromRedirect = sessionsSlice.actions.addCodeFromRedirect

export const sessionListener = createListenerMiddleware()

sessionListener.startListening({
  actionCreator: addSession,
  effect: async (_action, listenerApi) => {
    const allState = listenerApi.getState() as RootState
    const sessionState = allState.session.sessions;
    sessionStorage.setItem('my-sessions', JSON.stringify(sessionState))
    console.log('listener saved my-sessions')
  }
})
sessionListener.startListening({
  actionCreator: attachToken,
  effect: async (_action, listenerApi) => {
    const allState = listenerApi.getState() as RootState
    const sessionState = allState.session.sessions;
    sessionStorage.setItem('my-sessions', JSON.stringify(sessionState))
    console.log('listener saved my-sessions')
  }
})
export const sessionReducer = sessionsSlice.reducer ;
