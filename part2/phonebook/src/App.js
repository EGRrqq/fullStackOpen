import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
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
        setNewNumber('')
    }

    const filterResult = () => {
        const regExp = new RegExp(filter, 'i')
        return persons.filter( person => person.name.match(regExp))
    }

    const personsToShow = filterResult()

    const handleNoteChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    filter shown with <input value={filter} onChange={handleFilter}/>
                </div>
            </form>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNoteChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {personsToShow.map(element => {
                    return (
                        <div key={element.id}>
                            {element.name} {element.number}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App