import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'

import './index.css'
import ReactContext from '../../Context/ReactContext'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ReactContext.Consumer>
      {value => {
        const {
          navItemsHide,
          toggleNavItemsHide,
          headerActiveTabHome,
          onChangeHeaderActiveTabFalse,
          onChangeHeaderActiveTabTrue,
        } = value
        const navToggleItems = () => {
          toggleNavItemsHide()
        }
        const onChangeHeaderTabFalse = () => {
          onChangeHeaderActiveTabFalse()
        }

        const onChangeHeaderTabTrue = () => {
          onChangeHeaderActiveTabTrue()
        }

        const onClose = () => {
          toggleNavItemsHide()
        }

        const tabHomeClr = headerActiveTabHome ? 'blue' : 'grey'
        const tabShelvesClr = headerActiveTabHome ? 'grey' : 'blue'

        return (
          <nav className="nav-header">
            <div className="nav-content">
              <Link to="/">
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/chand1131/image/upload/v1674287174/logoBook_kbwkol.png"
                  alt="website logo"
                />
              </Link>
              <ul className="nav-menu">
                <Link to="/" className="nav-link">
                  <button onClick={onChangeHeaderTabTrue} type="button">
                    <li className={`home ${tabHomeClr}`}>Home</li>
                  </button>
                </Link>
                <Link to="/shelf" className="nav-link">
                  <button onClick={onChangeHeaderTabFalse} type="button">
                    <li className={`shelves ${tabShelvesClr}`}>Bookshelves</li>
                  </button>
                </Link>
              </ul>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
            <div className="nav-menu-mobile">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/chand1131/image/upload/v1674290393/Group_7732_1_vtgrb5.png"
                  alt="website logo"
                  className="nav-bar-image"
                />
              </Link>
              <button
                type="button"
                onClick={navToggleItems}
                className="hamburger-btn"
              >
                <GiHamburgerMenu />
              </button>
              {navItemsHide ? null : (
                <ul className="nav-list-mobile">
                  <Link to="/" className="nav-link" onClick={onClose}>
                    <li className="home-mobile">Home</li>
                  </Link>
                  <Link to="/shelf" className="nav-link" onClick={onClose}>
                    <li className="shelves-mobile">Bookshelves</li>
                  </Link>

                  <li className="home-mobile">
                    <button
                      type="button"
                      className="logout-mobile-btn"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </li>

                  <li className="close-list">
                    <button
                      className="close-btn"
                      type="button"
                      onClick={onClose}
                    >
                      <AiFillCloseCircle size={25} />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        )
      }}
    </ReactContext.Consumer>
  )
}
export default withRouter(Header)
