import Header from '../Header'
import './index.css'
import ReactSlick from '../ReactSlick'

const Home = props => {
  const findBooks = () => {
    const {history} = props
    console.log(history)
    history.replace('/shelf')
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
      <button type="button" className="find-books-btn" onClick={findBooks}>
        Find Books
      </button>
      <div className="react-slick-container">
        <ReactSlick />
      </div>
    </div>
  )
}

export default Home
