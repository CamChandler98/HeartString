from .db import db
from .user import User
import datetime
now = datetime.datetime.now()
class MessageNotification ():

    __tablename__ = 'messsage_notifications'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    sender_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    seen = db.Column(db.Boolean(), default= False)
    created_at = db.Column(db.DateTime(), default= now)


    user = db.relationship("User", back_populates = 'received_notifications', foreign_keys='MessageNotification.user_id')

    sender = db.relationship("User", back_populates = 'sent_notifications', foreign_keys='MessageNotification.receiver_id')


    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "sender_id": self.sender_id,
            "seen": self.seen
        }
