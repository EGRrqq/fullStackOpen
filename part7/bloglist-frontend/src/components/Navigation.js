import React from 'react'
import { Link } from 'react-router-dom'
import LogoutForm from './LogoutForm'

import { AppBar, Toolbar, Button } from '@mui/material'

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    users
                </Button>
                <LogoutForm />
            </Toolbar>
        </AppBar>
    )
}




export default Navigation
