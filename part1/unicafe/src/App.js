import {useState} from "react";

/*
const Display = (props) => <div>{props.value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            <Display value={value} />
            <Button handleClick={() => setToValue(1000)} text='thousand'/>
            <Button handleClick={() => setToValue(0)} text='reset'/>
            <Button handleClick={() => setToValue(value + 1)} text='increment'/>
        </div>
    )
}
*/
const Display = (props) => <div>{props.text}{props.feedback}</div>
const Header = (props) => <div>{props.text}</div>
const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = (newValue) => {
        console.log('good', newValue)
        setGood(newValue)
    }
    const setToNeutral = (newValue) => {
        console.log('neutral', newValue)
        setNeutral(newValue)
    }
    const setToBad = (newValue) => {
        console.log('bad', newValue)
        setBad(newValue)
    }

    return (
        <div>
            <Header text='give feedback'/>
            <br/>
            <Button handleClick={() => setToGood(good + 1)} text='good'/>
            <Button handleClick={() => setToNeutral( neutral + 1)} text='neutral'/>
            <Button handleClick={() => setToBad(bad + 1)} text='bad'/>
            <br/>
            <br/>
            <Header text='statistics'/>
            <br/>
            <Display text='good ' feedback={good} />
            <Display text='neutral ' feedback={neutral} />
            <Display text='bad ' feedback={bad} />
        </div>
    )
}

export default App;