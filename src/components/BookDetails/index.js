import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

import Footer from '../Footer'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        title: data.book_details.title,
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        readStatus: data.book_details.read_status,
        rating: data.book_details.rating,
        aboutBook: data.book_details.about_book,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBooksList = () => {
    const {bookDetails} = this.state
    const {
      title,
      coverPic,
      authorName,
      rating,
      readStatus,
      aboutBook,
      aboutAuthor,
    } = bookDetails

    return (
      <>
        <div className="book-details-card">
          <div className="book-item-detail">
            <img src={coverPic} alt={title} className="book-cover-detail" />
            <div className="book-right-details-detail">
              <h1 className="book-title-detail">{title}</h1>
              <p className="book-author-name-detail">{authorName}</p>
              <div className="rating-section-detail">
                <p className="rating-detail">Avg Rating</p>
                <BsFillStarFill color="#FBBF24" width="32" height="32" />
                <p className="rating-detail">{rating}</p>
              </div>
              <p className="status-detail">
                Status: <span className="read-status-detail">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="book-detail-hr" />
          <h1 className="about-author">About Author</h1>
          <p className="about-author-desc">{aboutAuthor}</p>
          <h1 className="about-author">About Book</h1>
          <p className="about-author-desc">{aboutBook}</p>
        </div>
        <Footer />
      </>
    )
  }

  renderBooksFailureView = () => (
    <div className="failure-container-detail">
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
        onClick={this.getBookDetails}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container-detail" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  getApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksList()
      case apiStatusConstants.failure:
        return this.renderBooksFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-detail-page">
        <Header />
        {this.getApiStatus()}
      </div>
    )
  }
}
export default BookDetails
