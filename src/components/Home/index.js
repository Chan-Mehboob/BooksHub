import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import './index.css'
import ReactSlick from '../ReactSlick'

class Home extends Component {
  findBooks = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/shelf')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-page">
        <Header />
        <h1 className="home-body-heading">Find Your Next Favorite Books?</h1>
        <p className="home-body-desc">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <button
          type="button"
          className="find-books-btn"
          onClick={this.findBooks}
        >
          Find Books
        </button>
        <div className="react-slick-container">
          <ReactSlick />
        </div>
      </div>
    )
  }
}
export default Home
