import Course from "./components/Course";
import Header from "./components/Header";

const App = ({ courses }) => {

    return (
        <div>
            <Header genHead='Web development curriculum' />
            {courses.map(course =>
                <Course key={course.id} course={course} />
            )}
        </div>
    );
}


export default App