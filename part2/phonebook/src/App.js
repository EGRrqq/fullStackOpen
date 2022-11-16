import {useEffect, useState} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import ShowPersons from "./components/ShowPersons"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState({ type: null, content: null })

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
        }

        const personToCheck = persons.some(person => person.name.toLowerCase().trim() === newName.toLowerCase().trim())
        const personToFind = persons.find(person => person.name.toLowerCase().trim() === newName.toLowerCase().trim())

        if (personToCheck) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personObject = {...personToFind, number: newNumber}
                personService
                    .update(personToFind.id, personObject)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
                        setMessage({
                            type: 'success',
                            content: `Updated ${personObject.name}`
                        })
                        setNewName('')
                        setNewNumber('')
                        resetNotification()
                    })
                    .catch((error) => {
                        console.log(error.response.data.error)
                        setMessage({
                            type: 'error',
                            content: error.response.data.error,
                        })
                        resetNotification()
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons([...persons, returnedPerson])
                    setMessage({
                        type: 'success',
                        content: `Added ${personObject.name}`
                    })
                    setNewName('')
                    setNewNumber('')
                    resetNotification()
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                    setMessage({
                        type: 'error',
                        content: error.response.data.error,
                    })
                    resetNotification()
                })
        }
    }

    const regExp = new RegExp(newFilter, 'i')
    const personsToShow =  persons.filter(person => person.name.match(regExp))

    const resetNotification = () => {
        setTimeout(() => {
            setMessage({ type: null, content: null })
        }, 5000)
    }

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
        if (window.confirm(`Delete ${personToDelete.name} ?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage({
                        type: 'success',
                        content: `Information of ${personToDelete.name} has been removed successfully`
                    })
                    resetNotification()
                })
                .catch((error) => {
                    console.log(error)
                    setMessage({
                        type: 'error',
                        content: `Information of ${personToDelete.name} has already been removed from server`
                    })
                    resetNotification()
                    setPersons(persons.filter(person => person.name !== newName))
                })
        }
    }

    return (
        <div>
            <h3>Phonebook</h3>
            <Notification message={message} />
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