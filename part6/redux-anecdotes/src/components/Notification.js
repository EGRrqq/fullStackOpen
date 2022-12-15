/*import { useSelector } from 'react-redux'*/
import { connect } from "react-redux"

const Notification = (props) => {
/*  const notification = useSelector(state => state.notification)*/
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
      <>
        {props.notification &&
            <div style={style}>
              {props.notification}
            </div>}
      </>
  )
}

/*
export default Notification*/
const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications