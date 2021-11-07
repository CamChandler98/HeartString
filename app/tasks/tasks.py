from datetime import datetime
from random import random, randrange
from flask_apscheduler import APScheduler
from app import app, db
from app.models import Heart, User, Reply
from faker import Faker

from app.seeds.hearts import gen_text, get_ttl


def heart_expiration():
    utc_now = datetime.now().timestamp()
    with app.app_context():
        open_hearts = Heart.query.filter(Heart.open == True).all()


        print('getting open hearts', open_hearts)

        print('just one sec')
        for heart in open_hearts:
            try:
                print(f'current time {utc_now} - expiry time {heart.expiry} = {utc_now - heart.expiry}')
                if utc_now >= heart.expiry:
                    print('closing heart', heart.id)
                    heart.open = False
            except Exception as e:
                print(str(e))
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
    return 'hearts updated'


def demo_user_post():
    with app.app_context():
        romeowHeart = Heart(
            content = gen_text(),
            content_url = None,
            time_to_live = get_ttl(),
            user_id = 1,
            open = True
        )

        julionHeart = Heart(
            content = gen_text(),
            content_url = None,
            time_to_live = get_ttl(),
            user_id = 1,
            open = True
        )

        db.session.add(romeowHeart)
        db.session.add(julionHeart)
        db.session.commit()

def rand_user_post():

    with app.app_context():
        user_id = randrange(3,70)

        userHeart = Heart(
            content = gen_text(),
            content_url = None,
            time_to_live = get_ttl(),
            user_id = user_id,
            open = True
        )

        db.session.add(userHeart)
        db.session.commit()

        reply_user_id = randrange(3,70)

        while reply_user_id == user_id:
            reply_user_id = randrange(3,70)

        userReply = Reply(
            content = gen_text(),
            heart_id = userHeart.id,
            user_id = reply_user_id
        )

        db.session.add(userReply)
        db.session.commit()
