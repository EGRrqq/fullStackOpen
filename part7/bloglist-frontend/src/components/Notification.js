/*
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification.type === null || notification.content === null) {
        return null
    }
    return <div className={notification.type}>{notification.content}</div>
}

export default Notification
*/
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }

    return <>{notification && <div style={style}>{notification}</div>}</>
}

export default Notification
