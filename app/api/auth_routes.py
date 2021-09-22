from app.api.aws import public_file_upload
from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    error_messages = {key:value for (key,value) in validation_errors.items()}


    return error_messages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter((User.email == form.data['credential']) | (User.username == form.data['credential'])).first()

        login_user(user)
        
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        profile_picture_url = None
        try:
            uploaded_file = request.files['image']
            profile_picture_url = public_file_upload(uploaded_file, 'heartstringawsbuckect')

        except KeyError:
            profile_picture_url = 'https://heartstringawsbuckect.s3.amazonaws.com/heartstring-default-profile-picture.jpg'

        user = User(
            username=form.data['username'],
            display_name = form.data['display_name'],
            email=form.data['email'],
            password=form.data['password'],
            profile_picture_url = profile_picture_url,
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    print('going to send thd', validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
