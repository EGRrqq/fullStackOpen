import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from "../reducers/notificationReducer"

import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        const updatedAnecdote = await anecdoteService.voteAnecdote(
            anecdote.id
        )

        dispatch(voteAnecdote(updatedAnecdote))
        dispatch(showNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => dispatch(hideNotification()), 5000)
    }

    return (
        <>
            {[...anecdotes]
                .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList