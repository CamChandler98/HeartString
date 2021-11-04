from app.forms.reply_form import ReplyForm
from datetime import datetime
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.heart_form import HeartForm
from app.api.aws import public_file_upload
from flask import Blueprint, request
from sqlalchemy.sql.operators import op

from app.models import Heart, Reply, db
from app.models.reply_notification import ReplyNotification

reply_routes = Blueprint('replies', __name__)


@reply_routes.route('/')
def replies():
	replies = Reply.query.all()

	return {reply.id:reply.to_dict() for reply in replies}



@reply_routes.route('/<int:id>')
def reply(id):

    reply = Reply.query.get(id)

    return reply.to_dict()
@reply_routes.route('/user/<int:id>')
def user_replies(id):

    user_replies = Reply.query.filter(Reply.user_id == int(id)).all()

    return {reply.id:reply.to_dict() for reply in user_replies}

@reply_routes.route('/heart/<int:id>')
def heart_replies(id):
    heart_replies = Reply.query.filter(Reply.heart_id == int(id)).all()

    return {reply.id:reply.to_dict() for reply in heart_replies}

@reply_routes.route('/', methods = ['POST'])
def create_reply():
    form = ReplyForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        heart = Heart.query.get(int(form.data['heart_id']))

        reply = Reply(
            content = form.data['content'],
            user_id = form.data['user_id'],
            heart_id = form.data['heart_id'],
        )

        db.session.add(reply)
        db.session.commit()

        reply_notification = ReplyNotification(
            heart_id = form.data['heart_id'],
            user_id = heart.user_id
        )

        db.session.add(reply_notification)
        db.session.commit()
        
        return reply.to_dict()

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401

@reply_routes.route('/edit', methods= ['POST'])
def edit_heart():
    form = ReplyForm()
    data = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply_id = data['reply_id']

        content = form.data['content']

        reply = Reply.query.get(int(reply_id))

        reply.content = content if content else reply.content


        reply.updated_at = datetime.now()
        db.session.add(reply)
        db.session.commit()

        return reply.to_dict()

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401


@reply_routes.route('/<int:id>' ,methods = ['DELETE'])
def delete_reply(id):

    reply = Reply.query.get(id)

    db.session.delete(reply)
    db.session.commit()

    return {'deleted': reply.id}
