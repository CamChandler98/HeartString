from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User
import re

class EditUserForm(FlaskForm):

    display_name = StringField('display_name', validators=[DataRequired(), Length(min=1, max=80)])
