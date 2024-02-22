import React from 'react';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/app/store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  )
}

export default App