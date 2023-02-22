import { createAction } from "@reduxjs/toolkit"

export const setDark = createAction('mode/setDark')
export const setLight = createAction('mode/setLight')
export const setAuto = createAction('mode/setAuto')
export const setPrefersDark = createAction<boolean>('mode/setPrefersDark')
export const setPrefersLight = createAction<boolean>('mode/setPrefersLight')