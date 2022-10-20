const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Part = ({ name,  exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}


const Content = ({ parts }) => {
    return parts.map((obj) => {
        return <Part name={obj.name} exercises={obj.exercises} />;
    });
}

const Total = ({ parts }) => {
    const totalSum = parts.reduce((acc, obj) => acc + obj.exercises, 0);
    return (
        <p>Number of exercises { totalSum }</p>
    )
}

const App = () => {

/*    const course = 'Half Stack application development'
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
    )*/

    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}


export default App