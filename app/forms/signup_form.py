from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User
import re

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def strong_password(form,field):
    password = field.data
    if not re.fullmatch(r'[A-Za-z0-9]{8,}@#$%!^&+', password):
        raise ValidationError('Password must contain at least 8 characters that include at least 1 lowercase character, 1 uppercase character , 1 number and 1 special character(@#$%!^&)')
    else:
        print(password, 'password looks good')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=1, max =40)])
    email = StringField('email', validators=[DataRequired(), Email(),user_exists])
    password = StringField('password', validators=[DataRequired(),strong_password])
    display_name = StringField('display_name', validators=[DataRequired(), Length(min=1, max=80)])
