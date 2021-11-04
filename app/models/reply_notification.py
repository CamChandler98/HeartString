from .db import db
from .user import User
import datetime
now = datetime.datetime.now()


class ReplyNotification (db.Model):

    __tablename__ = 'reply_notifications'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    heart_id = db.Column(db.Integer(), db.ForeignKey('hearts.id'))
    seen = db.Column(db.Boolean(), default= False)
    created_at = db.Column(db.DateTime(), default= now)


    user = db.relationship("User", back_populates = 'received_reply_notifications', foreign_keys='ReplyNotification.user_id')

    heart = db.relationship("Heart", back_populates = 'reply_notifications', foreign_keys='ReplyNotification.heart_id')


    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "heart_id": self.heart_id,
            "seen": self.seen
        }
