import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutID = 0

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification() {
            return initialState
        },
    },
})

export const setNotification = (message, seconds) => {
    return (dispatch) => {
        dispatch(showNotification(message))
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, seconds * 1000)
    }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
