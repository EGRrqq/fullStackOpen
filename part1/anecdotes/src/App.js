import { useState } from 'react';

const Anecdote = (props) => (
    <div>
        <p>{props.anecdote}</p>
        <p>has {props.vote} votes</p>
    </div>
)

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
          {text}
        </button>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

    const handleRandomAnecdote = () => {
        const random = Math.floor(Math.random() * anecdotes.length);
        console.log('random value', random)
        setSelected(random);
    }

    const handleVoteCounter = () => {
        console.log(points)
        setPoints(points.map((elem, i) => i === selected ? elem + 1 : elem))
    }

    return (
        <div>
            <Anecdote anecdote={anecdotes[selected]} vote={points[selected]} />
            <Button onClick={handleVoteCounter} text="vote"  />
            <Button onClick={handleRandomAnecdote} text="next anectode"  />
        </div>
  )
}

export default App;