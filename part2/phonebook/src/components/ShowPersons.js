import ShowPerson from "./ShowPerson";

const ShowPersons = (props) => {
    return (
        <div>
            {props.personsToShow.map(person =>
                <ShowPerson
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    onRemovePerson={() => props.handleRemovePerson(person.id)}
                />
            )}
        </div>
    )
}

export default ShowPersons