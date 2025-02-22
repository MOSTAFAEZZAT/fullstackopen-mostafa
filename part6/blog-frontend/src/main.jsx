import ReactDOM from 'react-dom/client'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'

// Simple counter reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  case 'ZERO':
    return 0
  default:
    return state
  }
}

// Name reducer
const changeName = (state = '', action) => {
  switch (action.type) {
  case 'SET_NAME':
    return action.payload
  default:
    return state
  }
}

// Configure store with both reducers
const store = configureStore({
  reducer: {
    counter: counterReducer,
    name: changeName,
  },
})

const App = () => {
  return (
    <div>
      <div>
        {store.getState().counter} {/* Access the counter property directly */}
      </div>
      <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>

      <p>{store.getState().name}</p>
      <div>
        <input
          type='text'
          value={store.getState().name}
          onChange={(e) => store.dispatch({ type: 'SET_NAME', payload: e.target.value })}
          placeholder='Enter name'
        />
      </div>

    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })