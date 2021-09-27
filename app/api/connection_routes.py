from flask import Blueprint, request

from app.models import User, Heart, db

connection_routes = Blueprint('connections', __name__)
@connection_routes.route('/user/<int:id>')
def user_connections(id):
    user = User.query.get(id)
    return user.to_dict()['connections']

@connection_routes.route('/', methods = ['POST'])
def connect():
    data = request.get_json()

    chooser_id =  data['user_one']
    chosen_id = data['user_two']
    heart_id = data['heart_id']

    chooser = User.query.get(chooser_id)
    chosen = User.query.get(chosen_id)
    heart = Heart.query.get(heart_id)


    chooser.make_connection(chosen_id)

    heart.connect(chosen)
    db.session.add(chooser)
    db.session.add(heart)
    
    db.session.commit()



    return { chosen_id : chosen.to_dict_short()}

@connection_routes.route('/', methods = ['DELETE'])
def sever():

    data = request.get_json()

    user_one_id = data['user_one']
    user_two_id = data['user_two']

    user_one = User.query.get(user_one_id)

    user_one.sever_connection(user_two_id)


    db.session.add(user_one)

    db.session.commit()

    return str(user_two_id)
