import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import { App as HomeApp } from './containers'
import { UserApp } from './containers/user'

export const App = hot(module)(() => (
    <Switch>
      <Route exact path="/" component={HomeApp} />
      <Route path="/login" component={UserApp} />
    </Switch>
))
