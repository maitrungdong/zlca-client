import React, { forwardRef, useState } from 'react'

import { Virtuoso } from 'react-virtuoso'

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'
import useVirtual from 'react-cool-virtual'

const AccordionItem = forwardRef(({ children, height, ...rest }, ref) => {
  const [h, setH] = useState(height)

  return (
    <div
      {...rest}
      style={{ height: `${h}px` }}
      ref={ref}
      onClick={() => setH((prevH) => (prevH === 50 ? 100 : 50))}
    >
      {children}
    </div>
  )
})

const MessageList = ({ lib, messages }) => {
  const cache = new CellMeasurerCache({
    fixedHeight: false,
  })

  const { outerRef, innerRef, items } = useVirtual({
    itemCount: messages.length,
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
        list = (
          <div
            style={{ width: '100%', height: '600px', overflow: 'auto' }}
            ref={outerRef}
          >
            <div ref={innerRef}>
              {items.map(({ index, size, measureRef }) => {
                return (
                  <div
                    key={index}
                    ref={measureRef}
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
                          Message index: {index + 1}
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
                          Powered by Cool Virtual
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
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
