import React from 'react';
import { withRouter } from 'react-router'
import auth from '../lib/auth'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true })

            const { location } = this.props

            if (location.state && location.state.nextPathname) {
              this.props.router.replace(location.state.nextPathname)
            } else {
              this.props.router.replace('/')
            }
      })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">login</button>
        {this.state.error && (
            <p>Bad login information</p>
            )}
        </form>
        )
  }
}

// withRouter provides this.props.router
export default withRouter(Login);
