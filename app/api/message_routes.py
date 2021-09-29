from flask import Blueprint, request
from app.models import Message, User
from app.models.user import user_connections
from sqlalchemy import or_

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
def messages():
    messages = Message.query.all()

    return {message.id: message.to_dict() for message in messages}
@message_routes.route('/convo')
def get_conversation():
    data = request.get_json()

    user_one_id = data['user_one_id']
    user_two_id = data['user_two_id']

    print(user_one_id)
    print(user_two_id)

    messages = Message.query.filter(or_(Message.user_id == user_one_id, Message.user_id == user_two_id)).filter(or_(Message.receiver_id == user_one_id, Message.receiver_id == user_two_id))

    return {message.id: message.to_dict() for message in messages}
