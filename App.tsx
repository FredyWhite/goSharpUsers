import React from 'react';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/app/store'

function App() {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  )
}

export default App