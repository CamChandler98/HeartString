from flask import Blueprint
from sqlalchemy.sql.operators import op

from app.models import Heart, db

heart_routes = Blueprint('hearts', __name__)


@heart_routes.route('/')
def hearts():
    hearts = Heart.query.all()

    return {heart.id:heart.to_dict() for heart in hearts}

@heart_routes.route('/<int:id>')
def heart(id):

    heart = Heart.query.get(id)

    return heart.to_dict()
@heart_routes.route('/user/<int:id>')
def user_hearts(id):

    user_hearts = Heart.query.filter(Heart.user_id == int(id)).all()

    return {heart.id:heart.to_dict() for heart in user_hearts}
