import React from "react";
import Weather from "./Weather";

const Country = ({ countriesToShow }) => {
    return (
        <>
            <h2>{countriesToShow.name.common}</h2>
            <div>capital {countriesToShow.capital}</div>
            <div>area {countriesToShow.area}</div>
            <div>
                <h3>languages:</h3>
                <ul>
                    {Object.values(countriesToShow.languages).map(
                        (language, index) => <li key={index}>{language}</li>
                    )}
                </ul>
                <img src={countriesToShow.flags.svg} alt={countriesToShow.name.common + " flag"} height="150" width="150" />
            </div>
            <Weather capital={countriesToShow.capital}/>
        </>
    )
}

export default Country;