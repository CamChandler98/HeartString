"""added relationship between users and hearts

Revision ID: 34b7a70957ed
Revises: dfd00ae01572
Create Date: 2021-09-22 14:02:21.510038

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34b7a70957ed'
down_revision = 'dfd00ae01572'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('hearts', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'hearts', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'hearts', type_='foreignkey')
    op.drop_column('hearts', 'user_id')
    # ### end Alembic commands ###
