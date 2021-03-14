import React, { useState } from 'react'
import Elements from './components/Elements'
import logo from './logo.svg'
import './App.css'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Periodic Table of the Elements</p>
      </header>
      <Elements />
    </div>
  )
}

export default App
