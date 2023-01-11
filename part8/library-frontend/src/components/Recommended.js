import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
    const me = useQuery(ME)
    const books = useQuery(ALL_BOOKS, {
        variables: { genre: me?.data?.me?.favouriteGenre },
    })

    if (!show) {
        return null
    }

    if (books.loading) {
        return <div>loading...</div>
    }

    const filteredBooks = me?.data?.me?.favouriteGenre
        ? books.data.allBooks.filter((book) => book.genres.includes(me?.data?.me?.favouriteGenre))
        : books.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favourite genre <b>{me?.data?.me?.favouriteGenre}</b>
            </p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {filteredBooks.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended