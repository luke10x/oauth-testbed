import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { restrictedBackendEndpoint } from "../config";

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
  // apiRequestInProgress: boolean
  api: {
    data: any
    state: "ready" | "loading" | "completed"
  }
  redirect?: {
    code: string
    state: string
  }
}

export const initialState: SessionsState = {
  loading: true,
  sessions: [],
  api: {
    data: undefined,
    state: "ready"
  }
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

interface ApiRequestThunkParams {
  endpoint: string
  accessToken?: string
}
export const apiRequestThunk = createAsyncThunk(
  'session/kukuraku',
  async ({endpoint, accessToken}: ApiRequestThunkParams, _thunkApi) => {
    const headers: HeadersInit = accessToken
    ? { 'Authorization': `Bearer ${accessToken}` }
    : {}
    console.log({headers})
    const response = await fetch(endpoint, { headers })
    const text = await response.text()
    console.log ({response, text})
    return response
  }
)

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
    },
    resetApiRequest: (state, _action) => {
      state.api.data = undefined
      state.api.state = "ready"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(apiRequestThunk.pending, (state, action) => {
      state.api.state = "loading"
      return state
    })
    builder.addCase(apiRequestThunk.fulfilled, (state, action) => {
      state.api.state = "completed"
      return state
    })
  },
});

export const resetApiRequest = sessionsSlice.actions.resetApiRequest
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
