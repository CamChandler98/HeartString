from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User
import re

def password_matches(form, field):
    # Checking if password matches
    password = field.data

    user = User.query.get(form.data['user_id'])

    if not user:
        raise ValidationError("Sorry that doesn't match our data")
    if not user.check_password(password):
        raise ValidationError("Sorry that doesn't match our data")



class DeleteUserForm(FlaskForm):
        user_id = IntegerField('user_id', validators= [DataRequired])
        password = StringField('password', validators=[DataRequired(), password_matches])
