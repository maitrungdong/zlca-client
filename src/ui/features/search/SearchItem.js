import React from 'react'

const searchItem = (props) => {
  const { searchResult, chatWithUser } = props

  return (
    <div className="search-item">
      <div className="info">
        <div className="avatar">
          <img src={searchResult.avatar} alt="Thumbnail avatar" />
        </div>
        <div className="desc">
          <p className="full-name">{searchResult.fullName}</p>
          <p>{searchResult.phoneNumber}</p>
        </div>
      </div>
      <button
        className="button is-info is-medium"
        onClick={() => chatWithUser(searchResult)}
      >
        <span className="icon">
          <i className="far fa-comment"></i>
        </span>
        <span>trò chuyện</span>
      </button>
    </div>
  )
}

export default searchItem
