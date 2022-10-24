const Total = ({ parts }) => {
    const totalSum = parts.reduce((acc, obj) => acc + obj.exercises, 0);
    return (
        <h4>Number of exercises { totalSum }</h4>
    )
}
export default Total