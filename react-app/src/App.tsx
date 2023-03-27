import React from 'react';
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
        Open Authentication Testbed 💜✨🤮
      </h1>
      <Testbed />
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
