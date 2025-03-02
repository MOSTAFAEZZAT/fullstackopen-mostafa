import { useSelector } from 'react-redux'

const Notification = () => {
  // The selector returns the notification message from the Redux store.
  // Adjust the state path if your reducer is combined under a different key.
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  // Optionally, you can conditionally render nothing if there's no message:
  if (!notification) {
    return null
  }

  return <div style={style}>{notification}</div>
}

export default Notification
