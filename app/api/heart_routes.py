from datetime import datetime

from sqlalchemy.sql.expression import desc
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.heart_form import HeartForm
from app.api.aws import public_file_upload
from flask import Blueprint, request
from sqlalchemy.sql.operators import op
from sqlalchemy import func

from app.models import Heart, Reply, db

heart_routes = Blueprint('hearts', __name__)


@heart_routes.route('/')
def hearts():
    hearts = Heart.query.all()

    return {heart.id:heart.to_dict() for heart in hearts}

@heart_routes.route('/popular')
def top_hearts():
    # posts = db.session.query(Post).join(Comment).group_by(
    # Post.id).order_by(func.count().desc()).all()
    # data = posts[0:10]

    hearts = db.session.query(Heart).filter(Heart.open == True).join(Reply).group_by(Heart.id).order_by(func.count().desc()).limit(30).all()


    if hearts:
        return {"hearts": [heart.to_dict() for heart in hearts]}
    else:
        return {"error": ['Something went wrong']}

@heart_routes.route('/recent')
def recent_hearts():
    # entities = MyEntity.query.order_by(desc(MyEntity.time)).limit(3).all()

    hearts = Heart.query.filter(Heart.open == True).order_by(desc(Heart.created_at)).limit(30).all()

    if hearts:
        return {"hearts": [heart.to_dict() for heart in hearts]}
    else:
        return {"error": ['Something went wrong']}
@heart_routes.route('/<int:id>')
def heart(id):

    heart = Heart.query.get(id)

    return heart.to_dict()
@heart_routes.route('/user/<int:id>')
def user_hearts(id):

    user_hearts = Heart.query.filter(Heart.user_id == int(id)).order_by(desc(Heart.created_at)).all()

    return {heart.id:heart.to_dict() for heart in user_hearts}


@heart_routes.route('/', methods = ['POST'])
def create_heart():
    form = HeartForm()
    content_url = None
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            uploaded_file = request.files['image']

            content_url = public_file_upload(uploaded_file, 'heartstringawsbuckect')
        except KeyError:
            pass

        heart = Heart(
            content = form.data['content'],
            time_to_live = form.data['time_to_live'],
            content_url = content_url,
            user_id = form.data['user_id'],
            open = True,
            created_at = datetime.now(),
            updated_at = datetime.now()
        )
        db.session.add(heart)
        db.session.commit()
        return heart.to_dict()

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401

@heart_routes.route('/edit', methods= ['POST'])
def edit_heart():
    form = HeartForm()
    data = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        heart_id = data['heart_id']
        content_url = data['content_url']
        content = form.data['content']

        heart = Heart.query.get(int(heart_id))

        heart.content = content if content else heart.content

        heart.content_url = content_url if content_url else heart.content_url
        heart.updated_at = datetime.now()
        db.session.add(heart)
        db.session.commit()

        return heart.to_dict()

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401


@heart_routes.route('/<int:id>' ,methods = ['DELETE'])
def delete_heart(id):

    heart = Heart.query.get(id)

    db.session.delete(heart)
    db.session.commit()

    return {'deleted': heart.id}
