from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, SelectField
from wtforms.validators import AnyOf, DataRequired, Email, Length, ValidationError
from wtforms.fields.simple import TextField

class HeartForm(FlaskForm):
    content = TextField('content', validators = [DataRequired(), Length(min= 1, max = 250)])
    time_to_live = IntegerField('time_to_live', validators = [DataRequired(), AnyOf([86400,300,3600])])
    user_id = IntegerField('user_id', validators= [DataRequired()])
