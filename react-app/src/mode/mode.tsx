import { FC, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  modeSelector,
  setAuto,
  setDark,
  setLight,
  setPrefersDark,
  setPrefersLight,
} from './slice';

type ModeProps = {
  className?: string
}

const Mode: FC<ModeProps> = function () {  
    const dispatch = useAppDispatch();
    const mode = useAppSelector(modeSelector).selectedValue;

    const handleSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
      setDark()
      switch (evt.target.value) {
        case "dark":
          dispatch(setDark());
          break;
        case "light":
          dispatch(setLight());
          break;
        case "auto":
          dispatch(setAuto());
          break;
        default: console.error("unknown theme", evt.target.value);
      }
    }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    useEffect(() => {
      dispatch(setPrefersDark(prefersDark))
      dispatch(setPrefersLight(prefersLight))
    }, [prefersLight, prefersDark, dispatch])

    return (
        <div className="flex items-center w-half mb-6">
          <div className="w-200">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Switch theme
            </label>
          </div>
          <div className="w-fit relative">
            <select 
                className="block appearance-none w-full color-my-input pl-7 pr-6 border py-2 rounded shadow leading-tight"
                onChange={handleSelect}
                value={mode}
              >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">System</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
              {mode === "light" && <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3.563 18.563l1.781-1.828 1.406 1.406-1.781 1.828zM11.016 22.453v-2.953h1.969v2.953h-1.969zM12 5.484q2.484 0 4.242 1.758t1.758 4.242-1.758 4.242-4.242 1.758-4.242-1.758-1.758-4.242 1.758-4.242 4.242-1.758zM20.016 10.5h3v2.016h-3v-2.016zM17.25 18.141l1.406-1.359 1.781 1.781-1.406 1.406zM20.438 4.453l-1.781 1.781-1.406-1.406 1.781-1.781zM12.984 0.563v2.953h-1.969v-2.953h1.969zM3.984 10.5v2.016h-3v-2.016h3zM6.75 4.828l-1.406 1.406-1.781-1.781 1.406-1.406z"></path>
              </svg>}
              {mode === "dark" && <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.984 2.016q4.172 0 7.102 2.93t2.93 7.055-2.93 7.055-7.102 2.93q-2.719 0-4.969-1.313 2.297-1.313 3.633-3.633t1.336-5.039-1.336-5.039-3.633-3.633q2.25-1.313 4.969-1.313z"></path>
              </svg>}
              {mode === "auto" && <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path xmlns="http://www.w3.org/2000/svg" d="M16.783,10c0-1.049,0.646-1.875,1.617-2.443c-0.176-0.584-0.407-1.145-0.692-1.672c-1.089,0.285-1.97-0.141-2.711-0.883  c-0.741-0.74-0.968-1.621-0.683-2.711c-0.527-0.285-1.088-0.518-1.672-0.691C12.074,2.57,11.047,3.215,10,3.215  c-1.048,0-2.074-0.645-2.643-1.615C6.772,1.773,6.213,2.006,5.686,2.291c0.285,1.09,0.059,1.971-0.684,2.711  C4.262,5.744,3.381,6.17,2.291,5.885C2.006,6.412,1.774,6.973,1.6,7.557C2.57,8.125,3.215,8.951,3.215,10  c0,1.047-0.645,2.074-1.615,2.643c0.175,0.584,0.406,1.144,0.691,1.672c1.09-0.285,1.971-0.059,2.711,0.682  c0.741,0.742,0.969,1.623,0.684,2.711c0.527,0.285,1.087,0.518,1.672,0.693c0.568-0.973,1.595-1.617,2.643-1.617  c1.047,0,2.074,0.645,2.643,1.617c0.584-0.176,1.144-0.408,1.672-0.693c-0.285-1.088-0.059-1.969,0.683-2.711  c0.741-0.74,1.622-1.166,2.711-0.883c0.285-0.527,0.517-1.086,0.692-1.672C17.429,11.873,16.783,11.047,16.783,10z M10,13.652  c-2.018,0-3.653-1.635-3.653-3.652c0-2.018,1.636-3.654,3.653-3.654c2.018,0,3.652,1.637,3.652,3.654  C13.652,12.018,12.018,13.652,10,13.652z"/>
              </svg>}
            </div>
          </div>
        </div>
    );
}

export default Mode;