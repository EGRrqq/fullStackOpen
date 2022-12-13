import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {hideNotification, showNotification} from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        console.log('content', anecdote.content)
        dispatch(voteAnecdote(anecdote.id))
        dispatch(showNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => dispatch(hideNotification()), 5000)
    }

    return (
        <>
            {[...anecdotes]
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