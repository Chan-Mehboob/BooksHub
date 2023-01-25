import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <img
          src="https://res.cloudinary.com/chand1131/image/upload/v1674210525/Rectangle_1467_loginImg_xppcg5.png"
          alt="website login"
          className="website-login-desktop"
        />
        <img
          src="https://res.cloudinary.com/chand1131/image/upload/v1674290065/Ellipse_99_osyhvn.png"
          alt="website login"
          className="website-login"
        />
        <form className="login-card" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/chand1131/image/upload/v1674287174/logoBook_kbwkol.png"
            alt="login website logo"
            className="login-logo-desktop"
          />
          <img
            src="https://res.cloudinary.com/chand1131/image/upload/v1674290393/Group_7732_1_vtgrb5.png"
            alt="login website logo"
            className="login-logo"
          />

          <div className="input-section">
            <label className="label-name" htmlFor="login-name">
              Username*
            </label>
            <input
              onChange={this.onChangeUsername}
              id="login-name"
              type="text"
              className="input"
            />
          </div>
          <div className="input-section2">
            <label className="label-name2" htmlFor="login-password">
              Password*
            </label>
            <input
              onChange={this.onChangePassword}
              id="login-password"
              type="password"
              className="input2"
            />
          </div>
          {showSubmitError && (
            <p className="error-message-desktop">{errorMsg}</p>
          )}
          {showSubmitError && <p className="error-message">{errorMsg}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login
