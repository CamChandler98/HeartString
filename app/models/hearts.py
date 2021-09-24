import datetime
from .db import db


class Heart(db.Model):
    __tablename__ = 'hearts'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    content = db.Column(db.Text(), nullable = False)
    open = db.Column(db.Boolean(), nullable = False)
    time_to_live = db.Column(db.Integer(), nullable = False)
    content_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default= datetime.datetime.now())
    updated_at = db.Column(db.DateTime(), default= datetime.datetime.now())


    user = db.relationship('User', back_populates = 'hearts')

    replies = db.relationship('Reply', back_populates = 'heart')

    @property
    def expiry(self):
        return int(self.created_at.timestamp() + self.time_to_live)


    def to_dict(self):
        return{
            'id':self.id,
            'user_id':self.user_id,
            'display_name' : self.user.display_name,
            'username': self.user.username,
            'content': self.content,
            'time_to_live': self.time_to_live,
            'content_url' : self.content_url,
            'user_profile_pic': self.user.profile_picture_url,
            'expires': self.expiry,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
