const PersonForm = (props) => {
    return (
        <form onSubmit={props.onFormSubmit}>
            <div>
                name: <input value={props.newNameValue} onChange={props.onNameChange} type='text' />
            </div>
            <div>
                number: <input value={props.newNumberValue} onChange={props.onNumberChange} type='number'/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm