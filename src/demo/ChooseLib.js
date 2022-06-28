import React from 'react'

const ChooseLib = ({ isVirtualized, setIsVirtualized }) => {
  return (
    <div
      style={{
        justifyContent: 'center',
        padding: '5px 20px',
        display: 'flex',
        backgroundColor: '#209cdd',
        height: '100%',
      }}
    >
      <p style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>
        Choose a lib to perform:
        <br />
        <span
          className={`btn ${isVirtualized === 2 && 'active'}`}
          onClick={() => setIsVirtualized(2)}
        >
          non-virtualized
        </span>{' '}
        <span
          className={`btn ${isVirtualized === 0 && 'active'}`}
          onClick={() => setIsVirtualized(0)}
        >
          virtualized
        </span>{' '}
        <span
          className={`btn ${isVirtualized === -1 && 'active'}`}
          onClick={() => setIsVirtualized(-1)}
        >
          virtuoso
        </span>{' '}
        <span
          className={`btn ${isVirtualized === 1 && 'active'}`}
          onClick={() => setIsVirtualized(1)}
        >
          cool virtual
        </span>
      </p>
    </div>
  )
}

export default ChooseLib
