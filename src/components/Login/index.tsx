import * as React from 'react'
import {
  Redirect,
} from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: () => any) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: () => any) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export class LoginComp extends React.Component {
  state = { redirectToReferrer: false }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    let { from } = { from: { pathname: '/' } }
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
