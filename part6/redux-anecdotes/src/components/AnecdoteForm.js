import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

import {hideNotification, showNotification} from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(showNotification(`you created '${content}'`))
        setTimeout(() => dispatch(hideNotification()), 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm