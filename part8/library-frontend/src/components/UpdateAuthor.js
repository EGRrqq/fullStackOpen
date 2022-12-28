import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const UpdateAuthor = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        editAuthor({ variables: { name, setBornTo: Number(born) } })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birth year</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name
                    <input
                        type='text'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={(event) => setBorn(event.target.value)}
                    />
                </div>
                <button>update author</button>
            </form>
        </div>
    )
}

export default UpdateAuthor