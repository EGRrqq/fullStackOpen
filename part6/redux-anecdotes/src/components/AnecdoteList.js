import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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