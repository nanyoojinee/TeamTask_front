import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store'; // store.js 파일에서 store를 import

// document.getElementById('root')의 반환값에 대한 타입 단언
const rootElement = document.getElementById('root') as HTMLElement;

// rootElement가 정상적으로 존재하는 경우에만 ReactDOM.createRoot를 호출
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <div id="modal-root"></div>
        <App />
      </Provider>
    </React.StrictMode>
  );

  reportWebVitals();
}
