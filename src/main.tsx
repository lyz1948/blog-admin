import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { configureStore } from './store'
import './app.css'
import { App } from './app'

const history = createBrowserHistory()
const store = configureStore()

const render = (Component: any) => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<Component />
			</Router>
		</Provider>,
		document.getElementById('app') as HTMLElement,
	)
}

render(App)

if (module.hot) {
	module.hot.accept('./containers/index', () => {
		render(App)
		render(require('./containers/index'))
	})
}
