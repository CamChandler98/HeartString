from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.edit_user_form import EditUserForm
from app.api.aws import public_file_upload
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

from app.models.user import user_connections

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<string:username>')
def user_by_name(username):
    user =  User.query.filter( User.username == username).first()

    return user.to_dict()

@user_routes.route('/<int:id>/edit', methods = ['PUT'])
def edit_user(id):

    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        user = User.query.get(id)
        isImage = request.form['isImage']
        print('is image', isImage)
        profile_picture_url = user.profile_picture_url if len(isImage) > 0 else 'https://heartstringawsbuckect.s3.amazonaws.com/heartstring-default-profile-picture.jpg'

        print('i am here')
        try:
            print(request.files['image'], 'look at nothing')
            uploaded_file = request.files['image']
            profile_picture_url = public_file_upload    (uploaded_file, 'heartstringawsbuckect')
        except KeyError:
            pass

        user.display_name = form.data['display_name'] if form.data['display_name'] else user.display_name

        user.profile_picture_url = profile_picture_url

        db.session.add(user)

        db.session.commit()

        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}
