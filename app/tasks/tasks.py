from datetime import datetime
from flask_apscheduler import APScheduler
from app import app, db
from app.models import Heart



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
