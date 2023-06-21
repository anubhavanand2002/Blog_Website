import { ChakraProvider, ColorModeScript,theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider  store={store}>
    <StrictMode>
      <ChakraProvider theme={theme}>
      <ColorModeScript />
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </ChakraProvider>
    </StrictMode>
  </Provider>
);


