import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authenticateEndpoint, tokenEndpoint } from "../config";
import { generateChallengeAndVerifier, generateStateString } from "../lib/auth";
import { buildPkceAuthParams, buildTokenParams } from "./functions";

export interface RootState {
  session: SessionsState
}

export interface SessionAuthentication {
  state: "editable" | "waitingForPkce" | "dipatched" | "completed"
}

type AuthorizationCodeScopes = ["openid", "profile", ...string[]];

export type FlowType = "AuthorizationCodePkceFlow"

export interface AuthorizationCodePkceFlow {
  type: "AuthoricationCodePkceFlow"
  stateString: string
  codeVerifier: string
  codeChallenge: string
  scopes: AuthorizationCodeScopes
  phase: Phase
  code?: string
  tokenId?: number
}

export type Flow = | AuthorizationCodePkceFlow

export interface Session {
  id: number;
  stateString: string
  codeVerifier: string
  accessToken?: string
}

interface TokenInfo {
  id: number
  accessToken: string
  flow: Flow
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
  flow?: Flow
  tokens: Array<TokenInfo>
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
  requests: [],
  flow: undefined,
  tokens: []
};

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

type Phase = "in customization" | "in authorization" | "authorized" | "got token"

export const startAuthorizationCodePkceFlowThunk = createAsyncThunk(
  'thunk/startFlow',
  async () => {
    const { codeChallenge, codeVerifier } = await generateChallengeAndVerifier()
    const stateString = generateStateString()

    return {
      type: "AuthoricationCodePkceFlow" as "AuthoricationCodePkceFlow",
      stateString,
      codeVerifier,
      codeChallenge,
      scopes: ["openid", "profile"] as AuthorizationCodeScopes,
      phase: "in customization" as Phase
    }
  }
)

export const goToAuthThunk = createAsyncThunk(
  'thunk/goToAuth',
  async (flow: AuthorizationCodePkceFlow , _thunkApi) => {
    sessionStorage.setItem('session.flow', JSON.stringify(flow))

    await new Promise(res => setTimeout(() => res(null), 1000))

    const href  = authenticateEndpoint + '?' + buildPkceAuthParams(flow)
    window.location.href = href
  }
)

export const fetchTokenThunk = createAsyncThunk(
  'thunk/fetchToken',
  async (flow: AuthorizationCodePkceFlow, thunkApi) => {
    const body = buildTokenParams(flow)
    const response = await fetch(tokenEndpoint, { 
      method: "POST",
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    const json = await response.json()
    return json.access_token
  }
)

export const apiRequestThunk = createAsyncThunk(
  'thunk/apiRequest',
  async ({endpoint, accessToken}: ApiRequestThunkParams, thunkApi) => {
    // pre-alloacte auto-increment ID
    const state = thunkApi.getState() as RootState
    const id = state.session.requests.length + 1

    // Starting request
    thunkApi.dispatch(createRequest({ id, endpoint, accessToken }))

    document.cookie=`auth.access_token=${accessToken}; Path=/`
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
    loadFlow: (state, action: PayloadAction<Flow>) => {
      state.flow = action.payload
      state.flow.phase = "authorized"
    },
    resetFlow: (state, _action) => {
      state.flow = undefined
    },
    addSession: (state, action: PayloadAction<AddSessionPayload>) => {
      const id = state.sessions.length + 1
      state.sessions.push({ id, ...action.payload})
    },
    addCodeFromRedirect: (state, action: PayloadAction<AddCodeFromRedirectPayload>) => {
      state.redirect = action.payload
      state.flow!.code = action.payload.code
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
    builder.addCase(startAuthorizationCodePkceFlowThunk.fulfilled, (state, action) => {
      state.flow = action.payload
    })
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
    builder.addCase(goToAuthThunk.pending, (state, action) => {
      state.flow!.phase = "in authorization"
    })
    builder.addCase(fetchTokenThunk.fulfilled, (state, action) => {
      const id = state.tokens.length + 1
      const tokenInfo: TokenInfo = {
        id,
        accessToken: action.payload,
        flow: state.flow!
      }
      state.tokens.push(tokenInfo)
      state.flow!.phase = "got token"
      state.flow!.tokenId = id
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
export const loadFlow = sessionsSlice.actions.loadFlow
export const resetFlow = sessionsSlice.actions.resetFlow

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


