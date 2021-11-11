import React from 'react'
import "../App.css"

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div className='redColor'>
      {notification.message}
    </div>
  )
}

export default Notification 