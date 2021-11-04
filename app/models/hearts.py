import datetime

from sqlalchemy.orm import backref
from .db import db
from app.models import User

class Heart(db.Model):
    __tablename__ = 'hearts'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    connector_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    grand_reply_id = db.Column(db.Integer(), db.ForeignKey('replies.id'))
    content = db.Column(db.Text(), nullable = False)
    open = db.Column(db.Boolean(), nullable = False)
    time_to_live = db.Column(db.Integer(), nullable = False)
    content_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default= datetime.datetime.now())
    updated_at = db.Column(db.DateTime(), default= datetime.datetime.now())


    user = db.relationship('User',
            foreign_keys = user_id,
            primaryjoin=user_id == User.id,
            backref=backref('hearts', order_by=id, cascade="all,delete")
     )
    connector = db.relationship('User',
            foreign_keys=connector_id,
            primaryjoin=connector_id == User.id,
            backref=backref('connected_hearts')
    )

    grand_reply = db.relationship('Reply', uselist = False, post_update = True, foreign_keys = [grand_reply_id])

    replies = db.relationship('Reply', cascade="all,delete", back_populates = 'heart', foreign_keys = '[Reply.heart_id]')

    reply_notifications = db.relationship('ReplyNotification', back_populates = 'heart', foreign_keys = 'ReplyNotification.heart_id')

    @property
    def expiry(self):
        return int(self.created_at.timestamp() + self.time_to_live)


    def to_dict(self):
        return{
            'id':self.id,
            'grand_reply_id': self.grand_reply_id,
            'grand_reply_content': self.grand_reply.content if self.grand_reply else None,
            'user_id':self.user_id,
            'connector_id':self.connector_id,
            'connector': self.connector.to_dict_short() if self.connector else None,
            'display_name' : self.user.display_name,
            'username': self.user.username,
            'content': self.content,
            'time_to_live': self.time_to_live,
            'content_url' : self.content_url,
            'user_profile_pic': self.user.profile_picture_url,
            'expires': self.expiry,
            'open': self.open,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def connect(self, user):
        self.connector = user

        return self.connector

    def set_grand_reply(self, reply_id):

        for reply in self.replies:
            if reply.id == reply_id:
                self.grand_reply_id = reply_id
                return
