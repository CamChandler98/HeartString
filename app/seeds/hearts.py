from app.seeds.utils import assign_from_dict, gen_count_dict
from app.models.user import User
import faker
from app.models import Heart, db
from faker import Faker
Faker.seed(0)
fake = Faker()
fake_latin = Faker('la')
fake_english = Faker('en-US')
fake_japanese = Faker('ja-JP')


import random
def get_ttl():
    return random.choice([86400,300,3600])
def get_image_url():
    url = fake.image_url() if fake.boolean(chance_of_getting_true=25) else None
    return url
def gen_text():
    language = random.choice([fake_latin,fake_japanese, fake_english])

    content = language.text(max_nb_chars=random.randrange(200,800))

    return content

def seed_base_hearts(seeds = 26):

    for i in range(seeds):

        heart = Heart(
            content = gen_text(),
            content_url = get_image_url(),
            time_to_live = get_ttl(),
            user_id = random.choice([1,2]),
            open = True,

        )
        db.session.add(heart)

    db.session.commit()

def seed_hearts(seeds = 300):
    user_dict = gen_count_dict(User)

    for i in range(seeds):
        heart = Heart(
            content = gen_text(),
            content_url = get_image_url(),
            time_to_live = get_ttl(),
            user_id = assign_from_dict(user_dict, 7),
            open = True
        )
        db.session.add(heart)

    db.session.commit()

def undo_hearts():
    db.session.execute('TRUNCATE hearts RESTART IDENTITY CASCADE;')
    db.session.commit()
