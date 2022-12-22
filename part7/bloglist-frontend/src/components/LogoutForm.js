import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (
        <p>
            {user.username} logged in
            <button onClick={() => dispatch(logoutUser())}>logout</button>
        </p>
    )
}

export default LogoutForm
