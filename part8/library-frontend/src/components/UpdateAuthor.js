import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const UpdateAuthor = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [selected, setSelected] = useState(null)

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const options = authors.map((author) => {
        return { value: author.name, label: author.name }
    })

    const handleSelection = (option) => {
        setSelected(option)
        setName(option.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        editAuthor({ variables: { name, setBornTo: Number(born) } })

        setName('')
        setBorn('')
        setSelected(null)
    }

    return (
        <div>
            <h2>Set birth year</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <Select
                        options={options}
                        value={selected}
                        onChange={handleSelection}
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