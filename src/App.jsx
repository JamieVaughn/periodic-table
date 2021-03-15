import React, { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import Table from './components/Table'
import Radial from './components/Radial'

import { elements } from './data/elements'


import logo from './logo.svg'
import './App.css'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <h1>Periodic Table of the Elements</h1>
        <Link to={'/'} style={{ marginLeft: 'auto', padding: '.5rem', color: 'coral', textDecoration: 'none' }}>
          Tabular
        </Link>
        <Link to={'/radial'} style={{ marginLeft: 'auto', padding: '.5rem', color: 'coral', textDecoration: 'none' }}>
          Radial
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Table data={elements} />} />
        <Route path="/radial" element={<Radial data={elements} dimensions={{w: 1150, h: 1150,  m: 10}} />} />
      </Routes>

    </div>
  )
}

export default App
