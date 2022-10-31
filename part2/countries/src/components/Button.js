import React, {useState} from "react";
import Country from "./Country";

const Button = ({ countriesToShow }) => {
    const [showCountry, setShowCountry] = useState(false)
    const handleShowCountryChange = () => setShowCountry(!showCountry)

    return (
        <>
            <button onClick={handleShowCountryChange}>{showCountry ? 'hide' : 'show'}</button>
            {showCountry && <Country countriesToShow={countriesToShow} />}
        </>
    )
}

export default Button;