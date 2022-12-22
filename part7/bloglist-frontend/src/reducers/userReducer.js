import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogsService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const loginUser = (userCredentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(userCredentials)
            blogsService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBloglistUser',
                JSON.stringify(user)
            )
            dispatch(setUser(user))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(exception.response.data.error, 5))
        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedBloglistUser')
        dispatch(setUser(null))
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
