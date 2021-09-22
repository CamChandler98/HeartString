from flask import Blueprint
from sqlalchemy.sql.operators import op

from app.models import Heart, db

heart_routes = Blueprint('hearts', __name__)

@heart_routes.route('/<int:id>')
def heart(id):
    print('getting heart id', id)
    all_hearts = Heart.query.all()
    open_hearts = Heart.query.filter(Heart.content == 'test').all()
    print('all hearts', all_hearts)
    print('should be here', open_hearts)

    return 'test'
