import './App.css';
import { Provider } from 'react-redux';

import Header from './Header';
import { store } from './app/store';
import { modeSelector } from './mode/slice';
import { useAppSelector } from './app/hooks';
import Testbed from './testbed/Testbed';

function FirstPage() {
  let colorTheme = useAppSelector(modeSelector).effectiveValue;

  return (
    <div className={`${colorTheme} h-full`}>
    <div className="h-full bg-my-solid p-2">
      <Header />
      <h1 className="text-3xl mb-4 text-black dark:text-white font-bold underline">
        Single Sign-On Testbed hey
      </h1>
      <Testbed />
      <h3 className="text-slate-900 text-black dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
        The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
      </p>
    </div>
  </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <FirstPage />
    </Provider>
  );
}

export default App;
