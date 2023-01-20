interface CoursePart {
    name: string;
    exerciseCount: number;
}

interface TotalProps {
    courseParts: Array<CoursePart>;
}

const Total = ({ courseParts }: TotalProps) => {
    return (
        <p>Number of exercises {courseParts.reduce((num, elem) => num + elem.exerciseCount, 0)}</p>
    );
};

export default Total