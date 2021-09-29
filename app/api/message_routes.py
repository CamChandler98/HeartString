from app.forms.message_form import MessageForm
from flask import Blueprint, request
from app.models import Message, User, db
from app.models.user import user_connections
from sqlalchemy import or_
from app.api.auth_routes import validation_errors_to_error_messages
message_routes = Blueprint('messages', __name__)

@message_routes.route('/user/<int:id>')
def messages(id):
    messages = Message.query.filter(or_(Message.user_id == id, Message.receiver_id == id)).all()

    return {message.id: message.to_dict() for message in messages}


@message_routes.route('/convo')
def get_conversation():
    data = request.get_json()

    user_one_id = data['user_one_id']
    user_two_id = data['user_two_id']



    messages = Message.query.filter(or_(Message.user_id == user_one_id, Message.user_id == user_two_id)).filter(or_(Message.receiver_id == user_one_id, Message.receiver_id == user_two_id))

    return {message.id: message.to_dict() for message in messages}

@message_routes.route('/', methods = ['POST'])
def create_message():
    form = MessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        message = Message(
            content = form.data['content'],
            user_id = form.data['user_id'],
            receiver_id = form.data['receiver_id'],
        )

        db.session.add(message)
        db.session.commit()

        return message.to_dict()

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/<int:id>' ,methods = ['DELETE'])
def delete_reply(id):

    message = Message.query.get(id)

    db.session.delete(message)
    db.session.commit()

    return {'deleted': message.id}
