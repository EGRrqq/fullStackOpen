import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (
        <>
            {user.username} logged in
            <button onClick={() => dispatch(logoutUser())}>logout</button>
        </>
    )
}

export default LogoutForm
