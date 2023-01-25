import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookItem} = props
  const {id, title, coverPic, authorName, rating, readStatus} = bookItem
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="book-item">
        <img src={coverPic} alt={title} className="book-cover" />
        <div className="book-right-details">
          <h1 className="book-title">{title}</h1>
          <p className="book-author-name">{authorName}</p>
          <div className="rating-section">
            <p className="rating">Avg Rating</p>
            <BsFillStarFill color="#FBBF24" width="16" height="16" />
            <p className="rating">{rating}</p>
          </div>
          <p className="status">
            Status: <span className="read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default BookItem
