import React, {useEffect, useState} from "react";
import axios from "axios";
import Filter from "./components/Filter";
import ShowCountries from "./components/ShowCountries";

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const regExp = new RegExp(search, 'i')
    const countriesToShow = countries.filter( country => country.name.common.match(regExp))

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <Filter value={search} onChange={handleSearchChange} />
            <ShowCountries value={search} countriesToShow={countriesToShow} />
        </div>
    )
}

export default App;