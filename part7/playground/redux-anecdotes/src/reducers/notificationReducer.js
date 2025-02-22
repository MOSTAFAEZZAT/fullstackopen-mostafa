
// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

// Export the plain actions
export const { setNotification, clearNotification } = notificationSlice.actions

// Thunk action creator for displaying a notification for a given duration (in seconds)
export const showNotification = (message, durationInSeconds) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, durationInSeconds * 1000)
  }
}

export default notificationSlice.reducer
