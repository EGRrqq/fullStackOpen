/*import { useDispatch } from 'react-redux'*/
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
/*    const dispatch = useDispatch()*/

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

/*        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created '${content}'`, 5))*/
        props.createAnecdote(content)
        props.setNotification(`you created '${content}'`, 5)
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

/*
export default AnecdoteForm*/
const mapDispatchToState = {
    createAnecdote,
    setNotification,
}

export default connect(
    null,
    mapDispatchToState
)(AnecdoteForm)