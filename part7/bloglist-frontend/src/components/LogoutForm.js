import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import { Button, FormHelperText } from '@mui/material'

const LogoutForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (
        <>
            <FormHelperText>{user.username} logged in</FormHelperText>
            <Button color="inherit" onClick={() => dispatch(logoutUser())}>logout</Button>
        </>
    )
}

export default LogoutForm
