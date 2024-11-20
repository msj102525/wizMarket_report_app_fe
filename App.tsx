import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store'
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Home />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
