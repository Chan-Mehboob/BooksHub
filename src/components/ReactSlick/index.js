import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'

/* Add css to your project */
import './index.css'
import Footer from '../Footer'
import TopRatedItem from '../TopRatedItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {
    topRatedList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedList()
  }

  getTopRatedList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(product => ({
        title: product.title,
        id: product.id,
        authorName: product.author_name,
        coverPic: product.cover_pic,
      }))
      this.setState({
        topRatedList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTopRatedList = () => {
    const {topRatedList} = this.state
    return (
      <ul className="slider-footer">
        <Slider {...settings}>
          {topRatedList.map(eachLogo => (
            <TopRatedItem details={eachLogo} key={eachLogo.id} />
          ))}
        </Slider>
        <Footer />
      </ul>
    )
  }

  renderTopRatedFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/chand1131/image/upload/v1674385730/Group_7522_d9ohym.png"
        alt="failure view"
        className="failure-img"
      />

      <img
        src="https://res.cloudinary.com/chand1131/image/upload/v1674387150/Group_7522_1_iuuzzi.png"
        alt="failure view"
        className="failure-img-mobile"
      />

      <p className="failure-desc">Something went wrong, Please try again.</p>
      <button
        type="button"
        onClick={this.getTopRatedList}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  getApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedList()
      case apiStatusConstants.failure:
        return this.renderTopRatedFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  findBooks = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/shelf')
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="slick-heading">Top Rated Books</h1>
        <button
          onClick={this.findBooks}
          type="button"
          className="find-books-btn-desktop"
        >
          Find Books
        </button>
        <div className="slick-container">{this.getApiStatus()}</div>
      </div>
    )
  }
}

export default withRouter(ReactSlick)
