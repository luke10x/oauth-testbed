import { createReducer } from '@reduxjs/toolkit';
import {
  setDark,
  setLight,
  setAuto,
  setPrefersDark,
  setPrefersLight
} from './actions';

export type ModeState = {
  effectiveValue: "light" | "dark";
  selectedValue: "light" | "dark" | "auto";
  prefersDark: boolean;
  prefersLight: boolean;
};

const initialState: ModeState = {
  effectiveValue: "light",
  selectedValue: "light",
  prefersDark: false,
  prefersLight: false
};

const calculateEffectiveValue = (state: ModeState) => {
  switch (state.selectedValue) {
    case "light": return "light";
    case "dark": return "dark";
    default:
      if (state.prefersDark) {
        return "dark";
      }
      if (state.prefersLight) {
        return "light";
      }
      return "light";
  }
}

export const modeReducer = createReducer(initialState, builder => {
  builder
    .addCase(setDark, state => {
      state.selectedValue = "dark";
      state.effectiveValue = calculateEffectiveValue(state);
    })
    .addCase(setLight, state => {
      state.selectedValue = "light";
      state.effectiveValue = calculateEffectiveValue(state);
    })
    .addCase(setAuto, state => {
      state.selectedValue = "auto";
      state.effectiveValue = calculateEffectiveValue(state);
    })
    .addCase(setPrefersDark, (state, prefers) => {
      state.prefersDark = prefers.payload;
      state.effectiveValue = calculateEffectiveValue(state);
    })
    .addCase(setPrefersLight, (state, prefers) => {
      state.prefersLight = prefers.payload;
      state.effectiveValue = calculateEffectiveValue(state);
    })
});