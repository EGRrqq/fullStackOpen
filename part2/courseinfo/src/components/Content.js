const Part = ({ name,  exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}


const Content = ({ parts }) => {
    return parts.map((obj) => {
        return <Part key={parts.id} name={obj.name} exercises={obj.exercises} />;
    });
}

export default Content