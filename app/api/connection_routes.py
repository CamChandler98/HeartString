from flask import Blueprint, request

from app.models import User, db

connection_routes = Blueprint('connections', __name__)

@connection_routes.route('/', methods = ['POST'])
def connect():
    data = request.get_json()

    chooser_id =  data['chooser_id']
    chosen_id = data['chosen_id']

    chooser = User.query.get(chooser_id)

    chooser.make_connection(chosen_id)

    db.session.add(chooser)

    db.session.commit()

    return chooser.to_dict()

@connection_routes.route('/', methods = ['DELETE'])
def sever():

    data = request.get_json()

    user_one = data['user_one']
    user_two = data['user_two']

    user_one.sever_connection(user_two)

    db.session.add(user_one)

    db.session.commit()
