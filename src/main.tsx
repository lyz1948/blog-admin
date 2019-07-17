import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { configureStore } from './store'
import { App } from './app'

const history = createBrowserHistory()
const store = configureStore()

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('app') as HTMLElement
// )

const render = (Component: any) => {
  ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
      <Component />
    </Router>
  </Provider>,
  document.getElementById('app') as HTMLElement
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./containers/index', () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require('./containers/index'));
  });
}