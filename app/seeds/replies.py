from flask_sqlalchemy.model import Model
from app.seeds.utils import assign_from_dict, gen_count_dict
from app.models.user import User
import faker
from app.models import Heart, Reply, db
from faker import Faker
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

def seed_base_replies(seeds = 25):
    romeo_hearts = Heart.query.filter(Heart.user_id == 1).all()
    juliet_hearts =  Heart.query.filter(Heart.user_id == 2).all()

    romeo_dict = dict()
    juliet_dict = dict()

    for item in romeo_hearts:
        romeo_dict[str(item.id)] = {'id':item.id, 'count': 0}

    for item in juliet_hearts:
        juliet_dict[str(item.id)] = {'id':item.id, 'count': 0}


    for i in range(seeds):
        romeo_reply = Reply(
            content = gen_text(),
            user_id = 1,
            heart_id = assign_from_dict(juliet_dict, 4)
        )

        db.session.add(romeo_reply)

        juliet_reply = Reply(
            content = gen_text(),
            user_id = 2,
            heart_id = assign_from_dict(romeo_dict, 4)
        )

        db.session.add(juliet_reply)


    db.session.commit()

def seed_replies(seeds = 500):
    user_dict = gen_count_dict(User)
    heart_dict = gen_count_dict(Heart)


    for i in range(seeds):
        reply = Reply(
            content= gen_text(),
            user_id = assign_from_dict(user_dict,7),
            heart_id = assign_from_dict(heart_dict, 10)
        )

        db.session.add(reply)


    db.session.commit()

def undo_replies():
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()
