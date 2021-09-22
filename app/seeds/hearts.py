from app.models import Heart, db

def seed_hearts():
    heart = Heart(
        content= 'test',
        open = True,
        time_to_live = 20,
    )

    heart2 = Heart(
        content= 'test',
        open = True,
        time_to_live = 100,
    )
    heart3 = Heart(
        content= 'test',
        open = True,
        time_to_live = 180,
    )

    heart4 = Heart(
        content= 'test',
        open = True,
        time_to_live = 180,
    )
    db.session.add(heart)
    db.session.add(heart2)
    db.session.add(heart3)
    db.session.add(heart4)
    db.session.commit()

def undo_hearts():
    db.session.execute('TRUNCATE hearts RESTART IDENTITY CASCADE;')
    db.session.commit()
