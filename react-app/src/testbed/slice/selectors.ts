import { createSelector } from '@reduxjs/toolkit';
import { RootState, SessionsState } from "./reducer";

const selectSessions = (state: RootState) => state.session;
export const sessionSelector = createSelector(selectSessions, state => state);

const selectRedirect = (state: RootState) => state.session.redirect;
export const redirectSelector = createSelector(selectRedirect, state => state)

export const selectSessionByStateStringSelector = 
  createSelector(
    [selectSessions, (_: RootState, needle: string) => needle],
    (state, needle) => state.sessions.find(session => session.stateString === needle)
  );

const selectAllTokens = (state: SessionsState): string[] => {
  return state.sessions
    .map(s => s.accessToken)
    .filter((item): item is string => !!item)
  }
export const allKnownTokensSelector = createSelector(
  (state: RootState) => state.session,
  selectAllTokens
)