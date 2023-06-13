import React from 'react'
import './index.css'

class Password extends React.Component {

  delete = () => {
    const {deleteItem, userDetails} = this.props
    const {id} = userDetails
    deleteItem(id)
  }

  render() {
    const {userDetails, passwordHidden} = this.props
    const {username, url, password,bgColor} = userDetails
    const userLogo = username.slice(0, 1)

    const displayPassword = passwordHidden ? (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars"
      />
    ) : (
      password
    )


    return (
      <li className="user-item">
        <div className="user-logo-container" style={{backgroundColor: bgColor}}>
          <h1 className="user-logo">{userLogo}</h1>
        </div>
        <div className="details-container">
          <div className="record-details">
            <p>{url}</p>
            <p>{username}</p>
            <p>{displayPassword}</p>
          </div>
          <button
            type="button"
            className="delete-btn"
            onClick={this.delete}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="delete-btn-img"
            />
          </button>
        </div>
      </li>
    )
  }
}

export default Password
