import {useState} from "react";

const StatisticLine  = (props) => <div>{props.text}{props.value}</div>
const Header = (props) => <h2>{props.text}</h2>
const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)
const Statistics = ({good, bad, neutral}) => {
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100 + ' %';

    if (!good && !bad && !neutral) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <div>
            <StatisticLine text='good ' value={good} />
            <StatisticLine text='neutral ' value={neutral} />
            <StatisticLine text='bad ' value={bad} />
            <StatisticLine text='all ' value={all} />
            <StatisticLine text='average ' value={average} />
            <StatisticLine text='positive ' value={positive} />
        </div>
    )
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToGood = (newValue) => setGood(newValue)
    const setToNeutral = (newValue) => setNeutral(newValue)
    const setToBad = (newValue) => setBad(newValue)

    return (
        <div>
            <Header text='give feedback'/>

            <Button handleClick={() => setToGood(good + 1)} text='good'/>
            <Button handleClick={() => setToNeutral( neutral + 1)} text='neutral'/>
            <Button handleClick={() => setToBad(bad + 1)} text='bad'/>

            <Header text='statistics'/>
            
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App;