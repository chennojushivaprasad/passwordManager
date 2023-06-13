import React from 'react'
import {v4 as uuid} from 'uuid'
import './index.css'
import Password from '../Password'

class PasswordManger extends React.Component {
  state = {
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordChecked: true,
    passwordRecords: localStorage.getItem("passwordRecords") ?JSON.parse(localStorage.getItem("passwordRecords")):[],
  }

  websiteInput = event => this.setState({websiteInput: event.target.value})

  userNameInput = event => this.setState({userNameInput: event.target.value})

  passwordInput = event => this.setState({passwordInput: event.target.value})

  searchInput = event => this.setState({searchInput: event.target.value})

  checkboxInput = () =>
    this.setState(prevState => ({
      passwordChecked: !prevState.passwordChecked,
    }))

  deleteItem = id => {
    const {passwordRecords} = this.state
    const filteredPasswordRecords = passwordRecords.filter(obj => id !== obj.id)
    this.setState({passwordRecords: filteredPasswordRecords})
  }

  getRandomColor = () => {
    const letters = '0123456789ABCDEF'.split('')
    let color = '#'
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.round(Math.random() * 15)]
    }
    return color
  }

  submit = e => {
    e.preventDefault()
    const {websiteInput, passwordInput, userNameInput} = this.state
    this.setState(prevState => {
      const newRecord = {
        id: uuid(),
        username: userNameInput,
        password: passwordInput,
        url: websiteInput,
        bgColor:this.getRandomColor(),
      }

      const updatedPasswordRecords = [...prevState.passwordRecords, newRecord]
      localStorage.setItem("passwordRecords",JSON.stringify(updatedPasswordRecords))
      return {passwordRecords: updatedPasswordRecords}
    })
  }

  searchRecords = () => {
    const {searchInput, passwordRecords} = this.state

    return passwordRecords.filter(obj =>
      obj.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  renderNoPassword = () => {
    const imgUrl =
      'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'
    return (
      <div className="no-password-container">
        <img src={imgUrl} alt="no passwords" className="no-password" />
        <p className="no-password-text">No Passwords</p>
      </div>
    )
  }

  renderPasswords = displayRecords => {
    const {passwordChecked} = this.state

    return (
      <ul className="password-card-container">
        {displayRecords.map(obj => (
          <Password
            userDetails={obj}
            passwordHidden={passwordChecked}
            key={obj.id}
            deleteItem={this.deleteItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput, websiteInput, passwordInput, userNameInput} = this.state

    const displayRecords = this.searchRecords()

    const isRecordsEmpty = displayRecords.length === 0

    return (
      <div className="container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            alt="app logo"
            className="app-logo"
          />
        </div>

        <div className="password-input-manage-container">
          <div className="add-password-card-container">
            <h1 className="add-password-heading">Add New Password</h1>
            <form onSubmit={this.submit}>
              <div className="input-container">
                <div className="input-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                    value={websiteInput}
                  />
                </div>
                <input
                  className="websiteInput"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.websiteInput}
                />
              </div>
              <div className="input-container">
                <div className="input-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    alt="username"
                    className="input-logo"
                  />
                </div>
                <input
                  className="usernameInput"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.userNameInput}
                  value={userNameInput}
                />
              </div>
              <div className="input-container">
                <div className="input-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-logo"
                  />
                </div>
                <input
                  className="passwordInput"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.passwordInput}
                  value={passwordInput}
                />
              </div>
              <div className="submit-button-container">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="user-login-img-container">
            <img
              src={
                window.innerWidth <= 576
                  ? 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png '
                  : 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png '
              }
              alt="password manager"
              className="userlogin-img"
            />
          </div>
        </div>

        <div className="password-display-container">
          <div className="password-header">
            <div className="password-heading-container">
              <h1 className="password-title">Your Passwords</h1>
              <p className="results-count">{displayRecords.length}</p>
            </div>
            <div className="search-input-container">
              <div className="search-input-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="search-input-logo"
                />
              </div>
              <input
                type="search"
                className="searchInput"
                onChange={this.searchInput}
                value={searchInput}
              />
            </div>
          </div>
          <div className="checkbox-container">
            <input
              id="showPasswordCheckbox"
              type="checkbox"
              onChange={this.checkboxInput}
              className="checkbox-input"
              alt="checkbox"
            />
            <label htmlFor="showPasswordCheckbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          {isRecordsEmpty
            ? this.renderNoPassword()
            : this.renderPasswords(displayRecords)}
        </div>
      </div>
    )
  }
}

export default PasswordManger
