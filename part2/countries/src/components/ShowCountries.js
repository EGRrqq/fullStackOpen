import React from "react";
import Country from "./Country";
import Button from "./Button";

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

export default ShowCountries;