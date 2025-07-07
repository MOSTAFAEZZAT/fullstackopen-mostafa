import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'


ReactDOM.createRoot(document.getElementById('app')).render(
  <Router>
    <App />
  </Router>
)
