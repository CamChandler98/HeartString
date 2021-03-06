from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, SelectField
from wtforms.validators import AnyOf, DataRequired, Email, Length, ValidationError
from wtforms.fields.simple import TextField

class ReplyForm(FlaskForm):

    content = TextField('content', validators = [DataRequired(message='no one wants an empty gesture please include a message'), Length(min= 1, max = 800)])

    user_id = IntegerField('user_id', validators= [DataRequired()])

    heart_id = IntegerField('heart_id', validators= [DataRequired()])
