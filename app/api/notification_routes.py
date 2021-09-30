from flask import Blueprint, request
from app.models import db
from app.models.message_notification import MessageNotification

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
