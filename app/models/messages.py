from .db import db
from .user import User
import datetime
now = datetime.datetime.now()


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    content = db.Column(db.Text(), nullable = False)
    created_at = db.Column(db.DateTime(), default= now)
    updated_at = db.Column(db.DateTime(), default= now)

    user = db.relationship("User", back_populates = 'sent_messages', foreign_keys='Message.user_id')

    receiver = db.relationship("User", back_populates = 'received_messages', foreign_keys='Message.receiver_id')

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "sender_id": self.user_id,
            "sender_name": self.user.display_name,
            "sender_pic": self.user.profile_picture_url,
            "recevier_id": self.receiver_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
