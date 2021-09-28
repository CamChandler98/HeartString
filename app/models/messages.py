from .db import db
from .user import User
import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer(), primary_key=True)
    connection_id = db.Column(db.Integer(), db.ForeignKey('user_connections.id'))
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    content = db.Column(db.Text(), nullable = False)
    created_at = db.Column(db.DateTime(), default= datetime.datetime.now())
    updated_at = db.Column(db.DateTime(), default= datetime.datetime.now())

    user = db.relationship("User", back_populates = 'messages')
