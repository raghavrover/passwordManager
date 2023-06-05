import './index.css'

const PasswordItem = props => {
  const {passwordItemDetails, isShowPasswordsTicked, removePasswordItem} = props
  const {websiteName, username, password, profileBg, id} = passwordItemDetails
  const deletePasswordItem = () => {
    removePasswordItem(id)
  }

  return (
    <li className="password-item">
      <div
        className="password-item-profile"
        style={{backgroundColor: `${profileBg}`}}
      >
        <p className="profile-letter">{websiteName[0].toUpperCase()}</p>
      </div>
      <div className="password-item-details">
        <p className="website-domain-name">{websiteName}</p>
        <p className="username">{username}</p>
        {isShowPasswordsTicked && (
          <p className="username show-hide-pwd">{password}</p>
        )}
        {!isShowPasswordsTicked && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
            className="hidden-pwd-stars"
            alt="stars"
          />
        )}
      </div>
      <button
        className="delete-btn"
        type="button"
        data-testid="delete"
        onClick={deletePasswordItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          className="delete-icon-img"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
