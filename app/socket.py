from flask_socketio import SocketIO
import os


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://heart-string.herokuapp.com",
        "http://heart-string.herokuapp.com"
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins, manage_session=False)


@socketio.on('connect')
def connect():
    print('I AM HERE')
    # socketio.emit('hi')


@socketio.on('connection_message')
def send_message(json):
    addy = f'message_to_{json["sent_to"]}_from_{json["sent_from"]}'
    print('Hey got the message, what should I do with it?')
    print('the adress looks like this', addy)
    socketio.emit(addy)