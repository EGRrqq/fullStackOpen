import React, {useEffect, useState} from "react";
import axios from "axios";

const Filter = ({ value, onChange }) => {
    return (
        <>
            find countries: <input value={value} onChange={onChange} />
        </>
    )
}

const Country = ({ countriesToShow }) => {
    return (
        <>
            <h2>{countriesToShow.name.common}</h2>
            <div>capital {countriesToShow.capital}</div>
            <div>area {countriesToShow.area}</div>
            <div>
                <h3>languages</h3>
                <ul>
                    {Object.values(countriesToShow.languages).map(
                        (language, index) => <li key={index}>{language}</li>
                    )}
                </ul>
                <img src={countriesToShow.flags.svg} alt={countriesToShow.name.common + " flag"} height="150" width="150" />
            </div>
        </>
    )
}

const Button = ({ countriesToShow }) => {
    const [showCountry, setShowCountry] = useState(false);
    const handleShowCountryChange = () => setShowCountry(!showCountry);
    return (
        <>
            <button onClick={handleShowCountryChange}>{showCountry ? 'hide' : 'show'}</button>
            {showCountry && <Country countriesToShow={countriesToShow} />}
        </>
    )
}

const ShowCountries = ({ value, countriesToShow }) => {
    if (value === '') {
        return (
            <></>
        )
    } else if (countriesToShow.length === 1) {
        return (
            <Country countriesToShow={countriesToShow[0]} />
        )
    } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return (
            <div>
                {countriesToShow.map((country, index) =>
                    <div key={index}>
                        {country.name.common}
                        <Button countriesToShow={countriesToShow[index]} />
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