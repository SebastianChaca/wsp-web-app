import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './redux/store';

import { SidebarEvents, SocketProvider, MessageEvents } from './socket';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <MessageEvents />
        <SidebarEvents />
        <ColorModeScript />
        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
