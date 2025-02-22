import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  // Dispatch actions for 'good', 'ok', 'bad', and 'reset stats'
  const handleGood = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const handleOk = () => {
    store.dispatch({ type: 'OK' })
  }

  const handleBad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const handleReset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={handleGood}>good</button> 
      <button onClick={handleOk}>ok</button> 
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

// Create root only once
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render the App component
const renderApp = () => {
  root.render(<App />)
}

// Initial render
renderApp()

// Subscribe to store updates to re-render the app
store.subscribe(renderApp)
