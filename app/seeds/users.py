from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Romeo = User(
        username='Romeow',
        email= 'juliet@romeo.com',
        display_name = 'Romeow',
        password = 'password',
        profile_picture_url = 'https://heartstringawsbuckect.s3.amazonaws.com/heartstring-default-profile-picture.jpg'
    )
    Juliet = User(
        username='Julion',
        email= 'juliet@juliet.com',
        display_name = 'Julion',
        password = 'password',
        profile_picture_url = 'https://heartstringawsbuckect.s3.amazonaws.com/heartstring-default-profile-picture.jpg'
    )
    db.session.add(Romeo)
    db.session.add(Juliet)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
