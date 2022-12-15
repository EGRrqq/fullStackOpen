/*import { useDispatch } from 'react-redux'*/
import { addFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
/*    const dispatch = useDispatch()*/

    const handleFilterChange = (event) => {
        const content = event.target.value
/*        dispatch(addFilter(content))*/
        props.addFilter(content)
    }

    const style = {
        marginBottom: 10
    }

    return(
        <div style={style}>
            filter <input name='filter' onChange={handleFilterChange} />
        </div>
    )
}

/*
export default Filter*/
const mapDispatchToProps = {
    addFilter,
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)