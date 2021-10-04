from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, SelectField
from wtforms.validators import AnyOf, DataRequired, Email, Length, ValidationError
from wtforms.fields.simple import TextField

class MessageForm(FlaskForm):

    content = TextField('content')

    user_id = IntegerField('user_id', validators= [DataRequired()])

    receiver_id = IntegerField('receiver_id', validators= [DataRequired()])
