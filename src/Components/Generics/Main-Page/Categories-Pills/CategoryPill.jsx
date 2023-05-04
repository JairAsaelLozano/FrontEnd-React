import "./CategoryPill.css"

function CategoryPill({ CategoryNumber, CategoryName, ContentCount }) {
  // const { CategoryNumber, CategoryName, ContentCount } = props
  return (
    <div className="top-cat-pill">
      <a href={`/search/posts/${CategoryName}`}>
        <h1>#{CategoryNumber} {CategoryName}</h1>
        <p>{ContentCount} publicaciones</p>
      </a>
    </div>
  )
}

export default CategoryPill