from app.models import db, User

def seed_connections():

    romeo = User.query.get(1)

    romeo.make_connection(2)

    db.session.add(romeo)

    db.session.commit()

def undo_connections():

    db.session.execute('TRUNCATE user_connections RESTART IDENTITY CASCADE;')
    db.session.commit()
