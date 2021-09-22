from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.heart_form import HeartForm
from app.api.aws import public_file_upload
from flask import Blueprint, request
from sqlalchemy.sql.operators import op

from app.models import Heart, db

heart_routes = Blueprint('hearts', __name__)


@heart_routes.route('/')
def hearts():
    hearts = Heart.query.all()

    return {heart.id:heart.to_dict() for heart in hearts}

@heart_routes.route('/<int:id>')
def heart(id):

    heart = Heart.query.get(id)

    return heart.to_dict()
@heart_routes.route('/user/<int:id>')
def user_hearts(id):

    user_hearts = Heart.query.filter(Heart.user_id == int(id)).all()

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
            open = True
        )
        db.session.add(heart)
        db.session.commit()
        return {heart.id: heart.to_dict()}
        
    return{'errors': validation_errors_to_error_messages(form.errors)}
