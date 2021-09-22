import datetime
from .db import db


class Heart(db.Model):
    __tablename__ = 'hearts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable = False)
    open = db.Column(db.Boolean, nullable = False)
    time_to_live = db.Column(db.Integer, nullable = False)
    content_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default= datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default= datetime.datetime.now())

    expiration_time = created_at.timestamp()

    def to_dict(self):
        return{
            'content': self.content,
            'time_to_live': self.time_to_live,
            'content_url' : self.content_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
