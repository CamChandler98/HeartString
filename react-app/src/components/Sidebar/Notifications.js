import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { getConnections } from "../../store/connections"
import NotificationCount from "./NotificationCount"
import { getMessageNotifications, goSeeMessageNotification } from "../../store/notification"
import { useSocket } from "../../context/Socket"
import ConnectionNotifications from "./ConnectionNotifications"
import HeartNotifications from "./HeartNotifications"


const Notifications = ({setPartner , partner, isFocusConnection }) => {
    return (
        <>
        {isFocusConnection && <ConnectionNotifications setPartner = {setPartner} partner = {partner} />}
        {isFocusConnection === false && <HeartNotifications /> }
        </>
    )
}

export default Notifications
