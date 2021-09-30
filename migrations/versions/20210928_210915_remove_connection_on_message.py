"""remove connection on message

Revision ID: bd1cb3a1db76
Revises: d99fa9e226c7
Create Date: 2021-09-28 21:09:15.525861

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd1cb3a1db76'
down_revision = 'd99fa9e226c7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('receiver_id', sa.Integer(), nullable=True))
    op.drop_constraint('messages_connection_id_fkey', 'messages', type_='foreignkey')
    op.create_foreign_key(None, 'messages', 'users', ['receiver_id'], ['id'])
    op.drop_column('messages', 'connection_id')
    op.drop_constraint('user_connections_id_key', 'user_connections', type_='unique')
    op.drop_column('user_connections', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_connections', sa.Column('id', sa.INTEGER(), sa.Identity(always=False, start=1, increment=1, minvalue=1, maxvalue=2147483647, cycle=True, cache=1), autoincrement=True, nullable=False))
    op.create_unique_constraint('user_connections_id_key', 'user_connections', ['id'])
    op.add_column('messages', sa.Column('connection_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.create_foreign_key('messages_connection_id_fkey', 'messages', 'user_connections', ['connection_id'], ['id'])
    op.drop_column('messages', 'receiver_id')
    # ### end Alembic commands ###