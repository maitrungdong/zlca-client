import React, { useRef } from 'react'

const CurrentConverHeader = ({
  title,
  avatar,
  lastActivity,
  setMsgNum,
  clearMsgList,
  backToMenu,
}) => {
  const msgNumRef = useRef(null)

  return (
    <div className="current-conver-header">
      <div className="current-conver-header__left">
        <div
          className="current-conver-header__avatar"
          style={{
            backgroundImage: `url(${avatar}`,
          }}
        ></div>
        <div className="current-conver-header__infos">
          <p className="current-conver-header__infos-title">{title}</p>
          <span className="current-conver-header__infos-last-activity">
            {lastActivity}
          </span>
        </div>
      </div>
      <ul className="current-conver-header__tools">
        <input ref={msgNumRef} type="number" />
        <button
          className="button is-primary is-medium"
          onClick={() => {
            setMsgNum(msgNumRef.current.value || 0)
          }}
        >
          Generate msgs
        </button>
        <button
          className="button is-danger is-medium"
          onClick={() => {
            msgNumRef.current.value = null
            clearMsgList()
          }}
        >
          Clear msgs
        </button>
        <button className="button is-medium" onClick={backToMenu}>
          Back
        </button>
      </ul>
    </div>
  )
}

export default CurrentConverHeader
