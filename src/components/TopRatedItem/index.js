import {Link} from 'react-router-dom'

const TopRatedItem = props => {
  const {details} = props
  const {id, title, authorName, coverPic} = details
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="slick-item">
        <img className="cover-pic" src={coverPic} alt={title} />
        <h1 className="title">{title}</h1>
        <p className="author-name">{authorName}</p>
      </li>
    </Link>
  )
}
export default TopRatedItem
