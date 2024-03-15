const Course = ({ course }) => {

    return (
        <div>
            {course.map(courses => (
                <div>
                    <h3> {courses.name}</h3>
                    {
                        courses.parts.map(part => (
                            <div>
                                <p key={part.id} > {part.name} {part.exercises} </p>
                            </div>
                        ))
                    }
                    <h3>
                        total of {courses.parts.reduce((total, part) => total + part.exercises, 0)} exercises
                    </h3>
                </div>
            ))}
        </div >
    )
}
export default Course