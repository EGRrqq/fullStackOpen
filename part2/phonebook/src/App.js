import {useEffect, useState} from 'react'
import personService from "./services/persons"


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
            {props.name} {props.number} <button onClick={props.onRemovePerson}>delete</button>
        </div>
    )
}

const ShowPersons = (props) => {
    return (
        <div>
            {props.personsToShow.map(person =>
                <ShowPerson
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    onRemovePerson={() => props.handleRemovePerson(person.id)}
                />
            )}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            /*id: persons.length + 1*/
        }

        for (let element of persons) {
            if (element.name === newName) {
                alert(`${newName} is already added to phonebook`)
                return
            }
        }

        personService
            .create(personObject)
            .then(returnedPersons => {
                setPersons(persons.concat(returnedPersons))
                setNewName('')
                setNewNumber('')
            })
    }

    const regExp = new RegExp(newFilter, 'i')
    const personsToShow =  persons.filter( person => person.name.match(regExp))

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleRemovePerson = (id) => {
        const personToDelete = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            personService.remove(id)
            setPersons(persons.filter(person => person.id !== id))
        }
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
            <ShowPersons personsToShow={personsToShow} handleRemovePerson={handleRemovePerson} />
        </div>
    )
}

export default App