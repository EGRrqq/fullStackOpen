import { useState, useEffect } from 'react'
import { useApolloClient , useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommended from "./components/Recommended"

import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            console.log(data)
            const addedBook = data.data.bookAdded
            window.alert(`Added ${addedBook.title} by ${addedBook.author.name}`)

            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(addedBook),
                }
            })
        },
    })

    useEffect(() => {
        setToken(localStorage.getItem('library-token'))
    }, []) // eslint-disable-line

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('login')
    }

    if (!token) {
        return (
            <>
                <Notify errorMessage={errorMessage} />

                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('login')}>login</button>
                </div>

                <Authors show={page === 'authors'} />
                <Books show={page === 'books'} />
                <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage}/>
            </>
        )
    }



    return (
        <>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommended')}>recommended</button>
                <button onClick={() => logout()}>logout</button>
            </div>

            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
            <Recommended show={page === 'recommended'} />
        </>
    )
}
export default App