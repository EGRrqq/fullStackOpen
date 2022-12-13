import { useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        dispatch(addFilter(event.target.value))
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

export default Filter