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

    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}


export default App