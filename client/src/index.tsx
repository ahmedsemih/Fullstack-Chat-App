import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
