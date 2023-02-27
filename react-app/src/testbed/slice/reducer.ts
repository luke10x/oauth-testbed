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
  // apiRequestInProgress: boolean
  api: {
    data: any
    state: "ready" | "customizing" | "loading" | "completed"
  }
  redirect?: {
    code: string
    state: string
  }
  requests: Request[]
}
interface Request {
  id: any
  endpoint: string
  response?: {
    httpStatus: number
    body: string
  }
}
export const initialState: SessionsState = {
  loading: true,
  sessions: [],
  api: {
    data: undefined,
    state: "ready"
  },
  requests: []
};

export const fetchSessionsThunk = createAsyncThunk(
  `thunk/fetchSessions`, async (): Promise<Session[]> => {
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

interface CreateRequestPayload {
  id: any,
  endpoint: string
  accessToken?: string
}

interface ApiRequestThunkParams {
  endpoint: string
  accessToken?: string
}


export const apiRequestThunk = createAsyncThunk(
  'thunk/apiRequest',
  async ({endpoint, accessToken}: ApiRequestThunkParams, thunkApi) => {
    // pre-alloacte auto-increment ID
    const state = thunkApi.getState() as RootState
    const id = state.session.requests.length + 1
    console.log("IDID", id)
    
    // Starting request
    thunkApi.dispatch(createRequest({ id, endpoint, accessToken }))

    const headers: HeadersInit = accessToken
      ? { 'Authorization': `Bearer ${accessToken}` }
      : {}
    const response = await fetch(endpoint, { headers })
    const body = await response.text()
    const httpStatus = response.status

    // Ending request
    return { id, httpStatus, body }
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
    resetApiRequest: (state) => {
      state.api.data = undefined
      state.api.state = "ready"
    },
    startCustomizingApiRequest: (state) => {
      state.api.data = undefined
      state.api.state = "customizing"
    },
    createRequest: (state, action: PayloadAction<CreateRequestPayload>) => {
      const id = action.payload.id
      state.requests.push({
        id,
        endpoint: action.payload.endpoint,
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(apiRequestThunk.pending, (state, action) => {
      state.api.state = "loading"
    })
    builder.addCase(apiRequestThunk.fulfilled, (state, action) => {
      state.api.state = "completed"
      const id = action.payload.id

      const index = state.requests.findIndex(r => r.id === id)
      state.requests[index].response = {
        httpStatus: action.payload.httpStatus,
        body: action.payload.body
      }
    })
  },
});

export const createRequest = sessionsSlice.actions.createRequest
export const startCustomizingApiRequest = sessionsSlice.actions.startCustomizingApiRequest
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
