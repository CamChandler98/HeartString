from app.models import db, User
from faker import Faker
Faker.seed(0)
fake = Faker()
fake_latin = Faker('la')
fake_english = Faker('en-US')
fake_japanese = Faker('ja-JP')

# Adds a demo user, you can add other users here if you want
def seed_base_users():
    Romeo = User(
        username='Romeow',
        email= 'romeo@romeo.com',
        display_name = 'Romeow',
        password = 'password',
        profile_picture_url = 'https://heartstringawsbuckect.s3.amazonaws.com/romeo-profile-pic.svg'
    )
    Juliet = User(
        username='Julion',
        email= 'juliet@juliet.com',
        display_name = 'Julion',
        password = 'password',
        profile_picture_url = 'https://heartstringawsbuckect.s3.amazonaws.com/julion-profile-pic.svg'
    )
    db.session.add(Romeo)
    db.session.add(Juliet)

    db.session.commit()

def seed_users(seeds=75):

    for i in range(seeds):
        isJapanese =  fake.boolean(chance_of_getting_true=20)

        username = fake_japanese.user_name() if isJapanese else fake_english.user_name()

        display_name = fake_japanese.romanized_name() if isJapanese else fake_english.name_nonbinary()

        email = fake_japanese.email() if isJapanese else fake_english.email()

        password = 'password'

        profile_picture_url = fake.image_url()

        user = User(
            username= username,
            display_name=display_name,
            email=email,
            profile_picture_url = profile_picture_url,
            password=password
        )

        db.session.add(user)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
