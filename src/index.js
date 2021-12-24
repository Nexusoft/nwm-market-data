import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './App';
import { initialize, updateCoreInfo, updateTheme } from './actions/general';

const store = configureStore();

const {
  libraries: { React, ReactDOM },
  utilities: { onceInitialize, onCoreInfoUpdated, onThemeUpdated },
} = NEXUS;

onceInitialize((data) => {
  store.dispatch(initialize(data));
});

onCoreInfoUpdated((coreInfo) => {
  store.dispatch(updateCoreInfo(coreInfo));
});

onThemeUpdated((theme) => {
  store.dispatch(updateTheme(theme));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
