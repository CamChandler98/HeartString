from flask_sqlalchemy.model import Model
from app.seeds.utils import assign_from_dict, gen_count_dict
from app.models.user import User, user_connections
from app.models import Message, db
from faker import Faker
from datetime import datetime
Faker.seed(0)
fake = Faker()
fake_latin = Faker('la')
fake_english = Faker('en-US')
fake_japanese = Faker('ja-JP')


import random

def gen_text():
    language = random.choice([fake_latin,fake_japanese, fake_english])

    content = language.text(max_nb_chars=random.randrange(5,800))

    return content

def seed_base_messages():

    message = Message(
        user_id = 1,
        content = 'message test',
        connection_id = 1,
        created_at = datetime.now(),
    )
    db.session.add(message)

    message2 = Message(
        user_id = 2,
        content = 'message test 2',
        connection_id = 1,
        created_at = datetime.now(),
    )
    db.session.add(message2)

    db.session.commit()

def seed_messages(seeds = 500):
    pass

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
