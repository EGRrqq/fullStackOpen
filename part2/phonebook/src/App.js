import { useState } from 'react'

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onFormSubmit}>
            <div>
                name: <input value={props.newNameValue} onChange={props.onNameChange} />
            </div>
            <div>
                number: <input value={props.newNumberValue} onChange={props.onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const ShowPerson = (props) => {
    return (
        <div>
            {props.name} {props.number}
        </div>
    )
}

const ShowPersons = (props) => {
    return (
        <div>
            {props.persons.map(person =>
                <ShowPerson
                    key={person.id}
                    name={person.name}
                    number={person.number} />
            )}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        for (let element of persons) {
            if (element.name === newName) {
                alert(`${newName} is already added to phonebook`)
                return
            }
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const personFilter = () => {
        const regExp = new RegExp(newFilter, 'i')
        return persons.filter( person => person.name.match(regExp))
    }

    const personsToShow = personFilter()

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h3>Phonebook</h3>
            <Filter value={newFilter} onChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm
                onFormSubmit={addPerson}
                newNameValue={newName}
                onNameChange={handleNameChange}
                newNumberValue={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <ShowPersons persons={personsToShow}/>
        </div>
    )
}

export default App