import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/chand1131/image/upload/v1674561232/Group_7484_v1jomo.png"
      alt="not found"
      className="not-found-img"
    />

    <img
      src="https://res.cloudinary.com/chand1131/image/upload/v1674562035/Group_7484_1_usdcr0.png"
      alt="not found"
      className="not-found-img-mobile"
    />

    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="go-back-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
