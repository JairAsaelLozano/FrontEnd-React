import "./CategoryPill.css"
import { Link , Navigate } from "react-router-dom"

function CategoryPill({ CategoryNumber, CategoryName, ContentCount }) {
  // const { CategoryNumber, CategoryName, ContentCount } = props
  return (
    <div className="top-cat-pill">
      <Link to={`/search/posts/${CategoryName}`}>
        <h1>#{CategoryNumber} {CategoryName}</h1>
        <p>{ContentCount} publicaciones</p>
      </Link>
    </div>
  )
}

export default CategoryPill