import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
// import other reducers here...

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    // other slices...
  },
})

export default store
