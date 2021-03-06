import React, { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import Table from './components/Table'
import Radial from './components/Radial'

import { elements } from './data/elements'


import logo from './logo.svg'
import './App.css'

function App(props) {
  const dimen = window.innerWidth * (2/3) / 2
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <h1>Periodic Table of the Elements</h1>
        <Link to={'/'} className="nav-link" style={{ marginLeft: 'auto'}}>
          Tabular
        </Link>
        <Link to={'/radial'} className="nav-link">
          Radial
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Table data={elements} />} />
        <Route path="/radial" element={<Radial data={elements} dimensions={{radius: dimen,  m: 10}} />} />
      </Routes>

    </div>
  )
}

export default App
