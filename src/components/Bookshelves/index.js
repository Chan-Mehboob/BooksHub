import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'
import BookItem from '../BookItem'
import Footer from '../Footer'
import Header from '../Header'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    booksList: [],
    apiStatus: apiStatusConstants.initial,
    shelf: bookshelvesList[0].value,
    search: '',
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {shelf, search} = this.state

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${search}`
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
        readStatus: product.read_status,
        rating: product.rating,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeBookShelf = value => {
    this.setState({shelf: value}, this.getBooksList)
  }

  onChangeSearch = event => {
    this.setState({
      search: event.target.value,
      apiStatus: apiStatusConstants.initial,
    })
  }

  onClickSearch = () => {
    this.getBooksList()
  }

  renderBooksList = () => {
    const {booksList, search} = this.state
    if (booksList.length === 0) {
      return (
        <div className="no-books-container">
          <img
            src="https://res.cloudinary.com/chand1131/image/upload/v1674491863/Group_skh93m.png"
            alt="no books"
            className="no-books-img"
          />
          <p className="no-books-desc">
            Your search for {search} did not find any matches.
          </p>
        </div>
      )
    }
    return (
      <>
        <ul className="books-bg">
          {booksList.map(each => (
            <BookItem bookItem={each} key={each.id} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderBooksFailureView = () => (
    <div className="failure-container-shelves">
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
        onClick={this.getBooksList}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container-shelves" testid="loader">
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
    const {shelf} = this.state

    const shelfHeading = bookshelvesList.filter(each => each.value === shelf)

    return (
      <div className="shelf-page">
        <Header />
        <div className="shelf-body">
          <div className="shelf-left">
            <div className="search-section-mobile">
              <input
                type="search"
                placeholder="Search"
                className="search-box"
                onChange={this.onChangeSearch}
              />
              <button
                onClick={this.onClickSearch}
                type="button"
                className="search-btn"
              >
                <BsSearch color="#94a3b8" width="20" height="20" />
              </button>
            </div>

            <h1 className="shelf-left-heading">Bookshelves</h1>
            <ul className="bookshelves-list">
              {bookshelvesList.map(each => {
                const onClickBookShelf = () => {
                  this.onChangeBookShelf(each.value)
                }
                const activeTab = each.value === shelf ? 'active-left-tab' : ''
                return (
                  <li key={each.id}>
                    <button
                      className={`item ${activeTab}`}
                      type="button"
                      onClick={onClickBookShelf}
                    >
                      {each.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <h1 className="shelf-right-heading">{shelfHeading[0].label} Books</h1>
          <div className="search-section">
            <input
              onChange={this.onChangeSearch}
              type="search"
              placeholder="Search"
              className="search-box"
            />
            <button
              onClick={this.onClickSearch}
              type="button"
              className="search-btn"
            >
              <BsSearch color="#94a3b8" width="20" height="20" />
            </button>
          </div>

          <ul className="books-list">{this.getApiStatus()}</ul>
        </div>
      </div>
    )
  }
}
export default Bookshelves
