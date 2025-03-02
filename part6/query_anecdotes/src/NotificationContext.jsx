// NotificationContext.js
import { createContext, useReducer, useContext } from 'react'

export const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

// Optional helper to simplify dispatching notifications
export const setNotification = (dispatch, message, duration = 5000) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, duration)
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}
