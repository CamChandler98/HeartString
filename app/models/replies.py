import datetime
from .db import db

class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    heart_id = db.Column(db.Integer(), db.ForeignKey('hearts.id'))
    content = db.Column(db.Text(), nullable = False)
    created_at = db.Column(db.DateTime(), default= datetime.datetime.now())
    updated_at = db.Column(db.DateTime(), default= datetime.datetime.now())

    user = db.relationship('User', back_populates = 'replies')

    heart = db.relationship('Heart', back_populates = 'replies', foreign_keys = [heart_id] )


    def to_dict(self):
        return{
            'id':self.id,
            'heart_id': self.heart_id,
            'user_id': self.user_id,
            'user_profile_pic': self.user.profile_picture_url,
            'username': self.user.username,
            'display_name': self.user.display_name,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
