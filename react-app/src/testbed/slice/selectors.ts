import { RootState } from "../../app/store";
import { createSelector } from '@reduxjs/toolkit';

const selectSessions = (state: RootState) => state.session;
export const sessionSelector = createSelector(selectSessions, state => state);
