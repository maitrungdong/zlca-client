import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ZaluChat from 'demo/ZaluChat'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<ZaluChat />} />
      </Routes>
    </div>
  )
}

export default App
