import React, { useState, useMemo } from 'react'
import { generateConversations } from './generateConversations'

import { List } from 'react-virtualized'
import { AutoSizer } from 'react-virtualized'
import useVirtual from 'react-cool-virtual'

// import { Virtuoso } from 'react-virtuoso'

import './conversationList.scss'
import ChooseLib from './ChooseLib'

const ConversationList = ({ convNum = 10 }) => {
  const [isVirtualized, setIsVirtualized] = useState(0)

  // const { outerRef, innerRef, items } = useVirtual({
  //   itemCount: convNum,
  //   itemSize: 75,
  // })

  const convers = useMemo(() => {
    const start = performance.now()
    const conversations = generateConversations(convNum)
    const end = performance.now()
    console.log(
      `Thời gian để generate ra conversation list với ${convNum} phần tử: ${
        (end - start) / 1000
      } (ms)`
    )
    console.log({ conversations })

    return conversations
  }, [convNum])

  const prepareList = () => {
    let list = null

    switch (isVirtualized) {
      case -1: {
        // const renderRowVirtuoso = (index, conver) => {
        //   return (
        //     <li className={`conversation-item ${index % 2 ? 'grey' : ''}`}>
        //       <div
        //         className="conversation-item__avatar"
        //         style={{
        //           backgroundImage: `url(${conver.avatar})`,
        //         }}
        //       ></div>
        //       <div className="conversation-item__content">
        //         <span className="conversation-item__name">
        //           {conver.title} {index + 1}
        //         </span>
        //         <p className="conversation-item__last-msg">
        //           {conver.lastMessage.slice(0, 100)}
        //         </p>
        //         <p style={{ fontSize: '10px', fontStyle: 'italic' }}>
        //           Powered by Virtuoso
        //         </p>
        //       </div>
        //       <i
        //         className={`fas fa-ellipsis-h conversation-item__more-tools`}
        //       ></i>
        //     </li>
        //   )
        // }

        // list = (
        //   <ul className="conversations-list">
        //     <Virtuoso
        //       defaultItemHeight={120}
        //       fixedItemHeight={120}
        //       style={{ height: '100%' }}
        //       overscan={4}
        //       data={convers}
        //       itemContent={renderRowVirtuoso}
        //     />
        //   </ul>
        // )
        break
      }
      case 0: {
        const renderRowVirtualized = ({ index, key, style }) => {
          return (
            <li key={key} className={`conversation-item`} style={style}>
              <div
                className="conversation-item__avatar"
                style={{
                  backgroundImage: `url(${convers[index].avatar})`,
                }}
              ></div>
              <div className="conversation-item__content">
                <span className="conversation-item__name">
                  {convers[index].title} {index + 1}
                </span>
                <p className="conversation-item__last-msg">
                  {convers[index].lastMessage.slice(0, 100)}
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '10px' }}>
                  Power by Virtualized
                </p>
              </div>

              <i
                className={`fas fa-ellipsis-h conversation-item__more-tools`}
              ></i>
            </li>
          )
        }
        list = (
          <ul className="conversations-list">
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <List
                    height={height}
                    width={width}
                    rowHeight={120}
                    rowCount={convers.length}
                    overscanRowCount={4}
                    rowRenderer={renderRowVirtualized}
                  />
                )
              }}
            </AutoSizer>
          </ul>
        )
        break
      }
      case 1: {
        // list = (
        //   <ul
        //     ref={outerRef}
        //     style={{ width: '100%', height: '100%', overflow: 'auto' }}
        //     className="conversations-list"
        //   >
        //     <div ref={innerRef}>
        //       {items.length > 0 &&
        //         items.map(({ index, size, measureRef }) => {
        //           return (
        //             <li
        //               ref={measureRef}
        //               key={index}
        //               className={`conversation-item `}
        //             >
        //               <div
        //                 className="conversation-item__avatar"
        //                 style={{
        //                   backgroundImage: `url(${convers[index].avatar})`,
        //                 }}
        //               ></div>
        //               <div className="conversation-item__content">
        //                 <span className="conversation-item__name">
        //                   {convers[index].title} {index + 1}
        //                 </span>
        //                 <p className="conversation-item__last-msg">
        //                   {convers[index].lastMessage.slice(0, 100)}
        //                 </p>
        //                 <p style={{ fontSize: '10px', fontStyle: 'italic' }}>
        //                   Powered by Cool Virtual
        //                 </p>
        //               </div>
        //               <i
        //                 className={`fas fa-ellipsis-h conversation-item__more-tools`}
        //               ></i>
        //             </li>
        //           )
        //         })}
        //     </div>
        //   </ul>
        // )
        break
      }
      case 2: {
        list = (
          <div className="conversations-list">
            {convers.map((conver, index) => {
              return (
                <div key={conver.id} className={`conversation-item`}>
                  <div
                    className="conversation-item__avatar"
                    style={{
                      backgroundImage: `url(${conver.avatar})`,
                    }}
                  ></div>
                  <div className="conversation-item__content">
                    <span className="conversation-item__name">
                      {conver.title} {index + 1}
                    </span>
                    <p className="conversation-item__last-msg">
                      {conver.lastMessage.slice(0, 100)}
                    </p>
                    <p style={{ fontSize: '10px', fontStyle: 'italic' }}>
                      Powered by Virtuoso
                    </p>
                  </div>
                  <i
                    className={`fas fa-ellipsis-h conversation-item__more-tools`}
                  ></i>
                </div>
              )
            })}
          </div>
        )
        break
      }
      default:
        break
    }

    return list
  }

  return (
    <>
      <ChooseLib
        isVirtualized={isVirtualized}
        setIsVirtualized={setIsVirtualized}
      />
      {prepareList()}
    </>
  )
}

export default ConversationList
