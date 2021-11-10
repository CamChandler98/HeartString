from flask import Blueprint, request
from app.models import db
from app.models.message_notification import MessageNotification
from app.models.reply_notification import ReplyNotification


notification_routes = Blueprint('notifications', __name__)


@notification_routes.route('/message/user/<int:id>')
def user_message_notifications(id):

    notifications = MessageNotification.query.filter(MessageNotification.user_id == id).filter(MessageNotification.seen == False)

    return {notification.id:notification.to_dict() for notification in notifications}


@notification_routes.route('/message/<int:id>', methods = ['DELETE'])
def see_notification(id):
    notification = MessageNotification.query.get(id)

    db.session.delete(notification)

    db.session.commit()

    return {'deleted': notification.id}

@notification_routes.route('/reply/user/<int:id>')
def user_reply_notifications(id):

    notifications = ReplyNotification.query.filter(ReplyNotification.user_id == id).filter(ReplyNotification.seen == False)

    return {notification.id:notification.to_dict() for notification in notifications}


@notification_routes.route('/reply/<int:id>', methods = ['DELETE'])
def see_reply_notification(id):
    notification = ReplyNotification.query.get(id)

    db.session.delete(notification)

    db.session.commit()

    return {'deleted': notification.id}
