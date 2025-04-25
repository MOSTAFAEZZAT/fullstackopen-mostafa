import { createSlice } from '@reduxjs/toolkit'

// our slice: holds `{ message, type }`
const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    setNotification(state, action) {
      // action.payload should be { message: string, type: 'success'|'error' }
      return action.payload
    },
    clearNotification() {
      return { message: null, type: null }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

// a thunk that shows a notification for `seconds`, then clears it
export const notify = (message, type = 'success', seconds = 5) => dispatch => {
  dispatch(setNotification({ message, type }))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

export default notificationSlice.reducer
