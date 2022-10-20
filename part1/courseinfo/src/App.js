const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Part1 = ({ part1 }) => {
    return (
        <p>{part1.name} {part1.exercises}</p>
    )
}

const Part2 = ({ part2 }) => {
    return (
        <p>{part2.name} {part2.exercises}</p>
    )
}

const Part3 = ({ part3 }) => {
    return (
        <p>{part3.name} {part3.exercises}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part1 part1={props.part1} />
            <Part2 part2={props.part2} />
            <Part3 part3={props.part3} />
        </div>
    )
}

const Total = ({ part1, part2, part3 }) => {
    return (
        <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    )
}

const App = () => {
    /*
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    */

    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total part1={part1} part2={part2} part3={part3} />
        </div>
    )
}


export default App