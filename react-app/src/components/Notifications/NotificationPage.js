import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const NotificationPage = () => {
    const [focus, setFocus] = useState('recent')

    const switchFocus = (e,target) => {
        if(focus === target) return
        console.log('switching focus to ', target)
        let barItems = document.querySelectorAll('.bar-item')
        for( let item of barItems){
            item.classList.remove('focused')
        }
        e.currentTarget.classList.add('focused')

        switch(target){
            case 'popular':
                setFocus('popular')
                break;
            case 'recent':
                setFocus('recent')
                break;
            default:
                break;
        }
    }

    return (
        <div className= 'home-container'>
        <div className ='home-header' >
            <span>Notifications</span>
        </div>
        <div className = 'tab-bar'>
            <div className ='bar-item focused yellow'
            onClick = {(e)=> switchFocus(e,'recent')}>
            <span>Messages</span>
            </div>
            <div className ='bar-item blue '
            onClick = {(e)=> switchFocus(e,'popular')}>
            <span>Replies</span>
            </div>
        </div>
        <div className = 'focus-content'>
        </div>
        </div>
    )
}


export default NotificationPage
