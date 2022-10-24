const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => {
    return parts.map((part) => {
        return <Part key={parts.id} part={part} />;
    });
}
export default Content