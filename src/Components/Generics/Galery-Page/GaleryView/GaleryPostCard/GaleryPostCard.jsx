import "./GaleryPostCard.css"

function GaleryPostCard({galeryInfo}) {
  return (
    <>
      <div className="galeryPost">
        <img src={galeryInfo.secure_url} alt="alt" />
      </div>
    </>
  )
}

export default GaleryPostCard