import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './reducer';

const selectMode = (state: RootState) => state.mode;

export const modeSelector = createSelector(selectMode, state => state);