import {useEffect, useState} from "react";
import axios from "axios";

const Filter = (props) => {
    return (
        <div>
            find countries: <input value={props.value} onChange={props.onChange}/>
        </div>
    )
}

/*const ShowCountry = (props) => {
    return (
        <div>
            <li key={props.index}>{props.country}</li>
        </div>
    )
}*/

const ShowCountries = (props) => {
    return (
        <ul>
            {props.countries.map((country, index) =>
                <li key={index}>{country.name.common}</li>
            )}
        </ul>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log('promise fulfilled')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const countriesToShow = () => {
        const regExp = new RegExp(search, 'i')
        return countries.filter( country => country.name.common.match(regExp))
    }

    const handleCountriesShow = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <Filter value={search} onChange={handleCountriesShow} />
            <ShowCountries countries={countriesToShow()} />
        </div>
    )
}

export default App;