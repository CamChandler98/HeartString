from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    user = User.query.filter((User.email == credential) | (User.username == credential)).first()
    if not user:
        raise ValidationError('No such user')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    user = User.query.filter((User.email == credential) | (User.username == credential)).first()
    if not user:
        raise ValidationError("Sorry that doesn't match our data")
    if not user.check_password(password):
        raise ValidationError("Sorry that doesn't match our data")


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
