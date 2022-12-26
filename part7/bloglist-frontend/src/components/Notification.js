import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    return <>{notification && <Alert color='info' icon={false}>{notification}</Alert>}</>
}

export default Notification
