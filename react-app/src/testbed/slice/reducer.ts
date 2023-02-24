import { createAsyncThunk, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SessionAuthentication {
  params: {

  }
  state: "editable" | "waitingForPkce" | "dipatched" | "completed"
}
export interface Session {
  id: number;
  name: string;
  
  // response_type: "code",
  // client_id: "reactclient"
  // redirect_url: string
  // scope: "openid profile messages"
  // state: string
  // code_challenge: string
  // code_challenge_method: "S256"
}

export interface SessionsState {
  loading: boolean
  sessions: Array<Session>
}

export const initialState: SessionsState = {
  loading: true,
  sessions: []
};

export const fetchSessionsThunk = createAsyncThunk(
  `session/fetchSessions`, async () => {
    const p1 = new Promise((res) => setTimeout(() => res("p1"), 1000));
    await p1;

    const data = localStorage.getItem('my-sessions')
    if (data === null) return [];
    return JSON.parse(data) as unknown as Session[]
  });

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action) => {
      const id = state.sessions.length + 1;
      const name = action.payload;
      state.sessions.push({ id, name });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSessionsThunk.pending, (state, action) => {
      state.loading = true
      state.sessions = []
      return state
    })
    builder.addCase(fetchSessionsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.sessions = action.payload
      return state
    })
  },
});

export const addSession = sessionsSlice.actions.addSession

export const sessionListener = createListenerMiddleware()

sessionListener.startListening({
  actionCreator: addSession,
  effect: async (_action, listenerApi) => {
    const allState = listenerApi.getState() as RootState
    const sessionState = allState.session.sessions;
    localStorage.setItem('my-sessions', JSON.stringify(sessionState))
    console.log('listener saved my-sessions')
  }
})

// For private needs
export const sessionReducer = sessionsSlice.reducer ;


