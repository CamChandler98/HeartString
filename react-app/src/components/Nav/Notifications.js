import { Link } from 'react-router-dom'
import notificationNavIcon from '../graphics/notification-nav-icon.svg'

const NotificationNav = () => {
    return (
        <Link to = '/notifications'>
            <img src = {notificationNavIcon} alt = 'to notifications' />
            <span> Notifications</span>
        </Link>
    )
}


export default NotificationNav
