import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const profileBgColors = ['#f59e0b', '#10b981', '#f97316', '#14b8a6', '#b91c1c']

class PasswordManager extends Component {
  state = {
    websiteName: '',
    username: '',
    password: '',
    showPasswords: false,
    searchInput: '',
    passwordItemsCount: 0,
    passwordItemsList: [],
  }

  getWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  removePasswordItem = id => {
    this.setState(prevState => {
      const newList = prevState.passwordItemsList.filter(
        eachItem => eachItem.id !== id,
      )
      return {
        passwordItemsList: [...newList],
        passwordItemsCount: prevState.passwordItemsCount - 1,
      }
    })
  }

  showAllPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const profileBg = profileBgColors[Math.floor(Math.random() * 5)]
    const {
      websiteName,
      username,
      password,
      passwordItemsCount,
      passwordItemsList,
    } = this.state
    if (websiteName === '' || username === '' || password === '') {
      return
    }
    const passwordDetailsObject = {
      id: uuidv4(),
      websiteName,
      username,
      password,
      profileBg,
    }

    this.setState({
      passwordItemsList: [...passwordItemsList, passwordDetailsObject],
      websiteName: '',
      username: '',
      password: '',
      passwordItemsCount: passwordItemsCount + 1,
    })

    console.log(passwordItemsList)
  }

  getLengthOfPasswordsList = currentPasswordItemsList =>
    currentPasswordItemsList.length

  render() {
    const {
      websiteName,
      username,
      password,
      showPasswords,
      searchInput,
      passwordItemsCount,
      passwordItemsList,
    } = this.state

    const currentPasswordItemsList = passwordItemsList.filter(eachItem => {
      const temp = eachItem.websiteName.toLowerCase()
      const temp2 = searchInput.toLowerCase()
      return temp.includes(temp2)
    })

    const lengthOfList = this.getLengthOfPasswordsList(currentPasswordItemsList)
    return (
      <div className="password-manager-container">
        <div className="password-manager-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="password-manager-logo-img"
            alt="app logo"
          />
        </div>
        <div className="password-adding-card password-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-manager-img sm-img"
            alt="password manager"
          />
          <form
            className="password-input-container"
            onSubmit={this.onAddPassword}
          >
            <h1 className="add-pwd-heading">Add New Password</h1>

            <div className="input-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-field-icon-img"
                alt="website"
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter Website"
                value={websiteName}
                onChange={this.getWebsiteName}
              />
            </div>
            <div className="input-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-field-icon-img"
                alt="username"
              />
              <input
                type="text"
                className="input-field"
                placeholder="Enter Username"
                value={username}
                onChange={this.getUsername}
              />
            </div>
            <div className="input-field-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-field-icon-img"
                alt="password"
              />
              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                value={password}
                onChange={this.getPassword}
              />
            </div>
            <div className="add-input-btn-container">
              <button type="submit" className="add-input-btn">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-img lg-img"
            alt="password manager"
          />
        </div>
        <div className="passwords-container password-card">
          <div className="passwords-container-header">
            <div className="passwords-count-container">
              <h1 className="your-passwords-text">Your Passwords</h1>
              <p className="passwords-count">{passwordItemsCount}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-input-icon"
                alt="search"
              />
              <input
                type="search"
                className="search-input-field"
                value={searchInput}
                onChange={this.getSearchInput}
              />
            </div>
          </div>
          <div className="show-passwords-container">
            <input
              id="showPwd"
              type="checkbox"
              onChange={this.showAllPasswords}
            />
            <label htmlFor="showPwd" className="show-passwords-text">
              Show Passwords
            </label>
          </div>
          {lengthOfList > 0 && (
            <ul className="password-item-list">
              {currentPasswordItemsList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordItemDetails={eachItem}
                  isShowPasswordsTicked={showPasswords}
                  removePasswordItem={this.removePasswordItem}
                />
              ))}
            </ul>
          )}
          {lengthOfList === 0 && (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-passwords-view"
                alt="no passwords"
              />

              <p className="no-passwords-text">No Passwords</p>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
