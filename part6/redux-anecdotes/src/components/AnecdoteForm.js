import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'

import { hideNotification, showNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.createNew(content)

        dispatch(appendAnecdote(newAnecdote))
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