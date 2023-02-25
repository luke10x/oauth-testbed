import { RootState } from "../../app/store";
import { createSelector } from '@reduxjs/toolkit';

const selectSessions = (state: RootState) => state.session;
export const sessionSelector = createSelector(selectSessions, state => state);

const selectRedirect = (state: RootState) => state.session.redirect;
export const redirectSelector = createSelector(selectRedirect, state => state)

const selectSessionByStateString = (state: RootState, needle: string) =>
  state.session.sessions.find(session => session.stateString === needle);

export const selectSessionByStateStringSelector = 
  createSelector(
    [selectSessions, (_: RootState, needle: string) => needle],
    (state, needle) => state.sessions.find(session => session.stateString === needle)
  );
