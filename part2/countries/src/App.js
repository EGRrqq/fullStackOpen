import React, {useEffect, useState} from "react";
import axios from "axios";

const Filter = ({value, onChange}) => {
    return (
        <div>
            find countries: <input value={value} onChange={onChange} />
        </div>
    )
}

const ShowCountry = ({ countriesToShow }) => {
    return (
        <div>
            <h2>{countriesToShow[0].name.common}</h2>
            <div>capital {countriesToShow[0].capital}</div>
            <div>area {countriesToShow[0].area}</div>
            <div>
                <h3>languages</h3>
                <ul>
                    {Object.values(countriesToShow[0].languages).map(
                        (language, index) => <li key={index}>{language}</li>
                    )}
                </ul>
                <img src={countriesToShow[0].flags.svg} alt={countriesToShow[0].name.common + " flag"} height="150" width="150" />
            </div>
        </div>
    )
}

const ShowCountries = ({ value, countriesToShow }) => {
    console.log(countriesToShow.length)
    console.log(value)
    if (value === '') {
        return (
            <></>
        )
    } else if (countriesToShow.length === 1) {
        return (
            <ShowCountry countriesToShow={countriesToShow} />
        )
    } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return (
            <div>
                {countriesToShow.map(country =>
                    <div key={country.name.common}>
                        {country.name.common}
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
}

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