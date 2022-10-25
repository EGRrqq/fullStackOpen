import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', id: 1}
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            id: persons.length + 1
        }

        for (let element of persons) {
            console.log('element name', element.name)
            if (element.name === newName) {
                alert(`${newName} is already added to phonebook`)
                return
            }
        }
        
        setPersons(persons.concat(personObject))
        setNewName('')
    }

    const handleNoteChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNoteChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(element => {
                    return (
                        <div key={element.id}>
                            {element.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App