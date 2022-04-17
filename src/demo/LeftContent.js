import React, { useRef, useState } from 'react'

import ConversationList from 'demo/ConversationList'

const LeftContent = ({ backToMenu }) => {
  const convNumRef = useRef(null)
  const [convNum, setConvNum] = useState(0)
  return (
    <div
      className="left-content"
      style={{ width: '60%', margin: '0 auto', background: 'rgb(245,245,245)' }}
    >
      <div className="left-content-header">
        <input ref={convNumRef} style={{ height: '30px' }} />
        <button
          className="button is-medium is-info"
          onClick={() => {
            setConvNum(convNumRef.current.value || 0)
          }}
        >
          Generate
        </button>
        <button
          className="button is-medium is-danger"
          onClick={() => {
            setConvNum(0)
            convNumRef.current.value = null
          }}
        >
          Clear
        </button>
        <button
          className="button is-medium is-info is-outlined"
          onClick={backToMenu}
        >
          Back
        </button>
      </div>
      <div className="tabs is-large">
        <ul>
          <li className={'is-active'}>
            <a href="#conversations">Trò chuyện</a>
          </li>
          <li>
            <a href="#notifications">Thông báo</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <ConversationList convNum={convNum} />
      </div>
    </div>
  )
}

export default LeftContent
