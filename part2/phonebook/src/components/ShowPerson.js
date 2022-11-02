const ShowPerson = (props) => {
    return (
        <div>
            {props.name} {props.number} <button onClick={props.onRemovePerson}>delete</button>
        </div>
    )
}

export default ShowPerson