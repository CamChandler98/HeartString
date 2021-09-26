from sqlalchemy.orm import backref
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_picture_url = db.Column(db.String(), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)


    hearts = db.relationship('Heart', back_populates = 'user')
    replies = db.relationship('Reply',back_populates = 'user' )

    connections = db.relationship(
        'User', lambda: user_connections,
        primaryjoin  = lambda: User.id == user_connections.c.user_id,
        secondaryjoin = lambda:User.id == user_connections.c.connection_id,
        backref= 'connectors',
        cascade = 'all, delete'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'display_name': self.display_name,
            'email': self.email,
            'profile_picture_url': self.profile_picture_url,
            'connections': {user.id: user.to_dict_short() for user in self.connections}
        }
    def to_dict_short(self):

        return {
            'id': self.id,
            'username': self.username,
            'display_name': self.display_name,
            'profile_picture_url': self.profile_picture_url,
        }

    def make_connection(self, user_id):

        user  = User.query.get(user_id)

        if not user in self.connections:
            self.connections.append(user)
            user.connections.append(self)

            db.session.add(self)
            db.session.add(user)

            db.session.commit()

    def sever_connection(self,user_id):

        user = User.query.get(user_id)

        if user in self.connections:
            self.connections.remove(user)
            user.connections.remover(self)

            db.session.add(self)
            db.session.add(user)

            db.session.commit()

user_connections = db.Table(
    'user_connections',
    db.Column('user_id' , db.Integer, db.ForeignKey(User.id), primary_key = True),

    db.Column('connection_id', db.Integer, db.ForeignKey(User.id), primary_key = True)
)
