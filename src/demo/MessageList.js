import React from 'react'

import { Virtuoso } from 'react-virtuoso'

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'

const MessageList = ({ lib, messages }) => {
  const cache = new CellMeasurerCache({
    fixedHeight: false,
  })

  const prepareRenderList = () => {
    let list = null

    switch (lib) {
      case 0: //react virtualized
        const renderByVirtualized = ({ index, key, style, parent }) => {
          return (
            <CellMeasurer
              cache={cache}
              columnIndex={0}
              key={key}
              rowIndex={index}
              parent={parent}
            >
              {({ measure, registerChild }) => (
                <div
                  ref={registerChild}
                  key={key}
                  style={style}
                  className={`message ${
                    messages[index].senderId === 1 ? 'me' : ''
                  }`}
                >
                  <div
                    className="message-sender-avatar"
                    style={{
                      backgroundImage: `url(${messages[index].avatar})`,
                    }}
                  ></div>
                  <div className="message-content">
                    <div className="message-content__main">
                      <h3 style={{ fontSize: '18px', fontWeight: '500' }}>
                        Message index: {messages[index].index}
                      </h3>
                      <textarea
                        rows={4}
                        cols={40}
                        className="text-message"
                        defaultValue={messages[index].text}
                      />
                    </div>

                    <div className="message-content__bottom">
                      <span className="message-content__bottom-send-time">
                        Powered by Virtualized
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CellMeasurer>
          )
        }

        list = (
          <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  width={width}
                  deferredMeasurementCache={cache}
                  height={height}
                  rowCount={messages.length}
                  rowHeight={cache.rowHeight}
                  rowRenderer={renderByVirtualized}
                  overscanRowCount={4}
                />
              )
            }}
          </AutoSizer>
        )
        break
      case 1: // react cool virtualized
        break
      case -1: //react virtuoso
        const renderByVirtuoso = (index, message) => {
          return (
            <div
              key={message.id}
              className={`message ${message.senderId === 1 ? 'me' : ''}`}
            >
              <div
                className="message-sender-avatar"
                style={{ backgroundImage: `url(${message.avatar})` }}
              ></div>
              <div className="message-content">
                <div className="message-content__main">
                  <h3 style={{ fontSize: '18px', fontWeight: '500' }}>
                    Message index: {index + 1}
                  </h3>
                  <textarea
                    rows={4}
                    cols={40}
                    className="text-message"
                    defaultValue={message.text}
                  />
                </div>

                <div className="message-content__bottom">
                  <span className="message-content__bottom-send-time">
                    Powered by Virtuoso
                  </span>
                </div>
              </div>
            </div>
          )
        }

        list = (
          <Virtuoso
            style={{ height: '100%' }}
            overscan={4}
            data={messages}
            itemContent={renderByVirtuoso}
          />
        )
        break

      default:
        break
    }

    return list
  }

  return <div className="message-list">{prepareRenderList()}</div>
}

export default MessageList
