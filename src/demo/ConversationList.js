import React, { useState, useMemo } from 'react'
import { generateConversations } from './generateConversations'
import { List } from 'react-virtualized'

import { AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { Virtuoso } from 'react-virtuoso'

const ConversationList = (props) => {
  const [isVirtualized, setIsVirtualized] = useState(true)
  const num = 1000
  const convers = useMemo(() => {
    return generateConversations(num)
  }, [num])

  const cache = new CellMeasurerCache({
    fixedWidth: false,
    fixedHeight: false,
    defaultHeight: 100,
  })

  const renderRowVirtuoso = (index, conver) => {
    return (
      <li className={`conversation-item `}>
        <div
          className="conversation-item__avatar"
          style={{
            backgroundImage: `url(${conver.avatar})`,
          }}
        ></div>
        <div className="conversation-item__content">
          <span className="conversation-item__name">{conver.title}</span>
          <p className="conversation-item__last-msg">
            {conver.lastMessage.slice(0, 100)}
          </p>
          <p style={{ fontSize: '10px', fontStyle: 'italic' }}>
            Powered by Virtuoso
          </p>
        </div>
        <i className={`fas fa-ellipsis-h conversation-item__more-tools`}></i>
      </li>
    )
  }

  const renderRowVirtualized = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <li className={`conversation-item`} style={style}>
          <div
            className="conversation-item__avatar"
            style={{
              backgroundImage: `url(${convers[index].avatar})`,
            }}
          ></div>
          <div className="conversation-item__content">
            <span className="conversation-item__name">
              {convers[index].title}
            </span>
            <p className="conversation-item__last-msg">
              {convers[index].lastMessage.slice(0, 100)}
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '10px' }}>
              Power by Virtualized
            </p>
          </div>

          <i className={`fas fa-ellipsis-h conversation-item__more-tools`}></i>
        </li>
      </CellMeasurer>
    )
  }

  return (
    <>
      <div
        style={{
          justifyContent: 'space-between',
          padding: '5px 20px',
          display: 'flex',
          backgroundColor: '#209cdd',
        }}
      >
        <p style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>
          Switch to {!isVirtualized ? 'virtualized' : 'virtuoso'}
        </p>
        <button
          style={{
            color: 'black',
            padding: '5px 10px',
            fontSize: 'inherit',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setIsVirtualized((prevState) => !prevState)}
        >
          Toggle
        </button>
      </div>
      <ul className="conversations-list">
        {/* <Scrollbars> */}
        {/* {convers.map((c) => {
          return <div key={c.id}>{renderRow(c)}</div>
        })} */}
        {isVirtualized ? (
          <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  height={height}
                  width={width}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowCount={convers.length}
                  overscanRowCount={4}
                  rowRenderer={renderRowVirtualized}
                />
              )
            }}
          </AutoSizer>
        ) : (
          <Virtuoso
            style={{ height: '100%' }}
            data={convers}
            itemContent={renderRowVirtuoso}
            alignToBottom={true}
          />
        )}

        {/* </Scrollbars> */}
      </ul>
    </>
  )
}

export default ConversationList
