from flask import Blueprint, request
from app.models import db

notification_routes = Blueprint('reply_notifications', __name__)


@notification_routes.route('/replies/user/<int:id>')
def user_reply_notifications(id):

    notifications = ReplyNotification.query.filter(ReplyNotification.user_id == id).filter(ReplyNotification.seen == False)

    return {notification.id:notification.to_dict() for notification in notifications}


@notification_routes.route('/message/<int:id>', methods = ['DELETE'])
def see_notification(id):
    notification = ReplyNotification.query.get(id)

    db.session.delete(notification)

    db.session.commit()

    return {'deleted': notification.id}
