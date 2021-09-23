from flask.cli import AppGroup
from .users import seed_users, seed_base_users,undo_users
from .hearts import seed_hearts, seed_base_hearts ,undo_hearts
from .replies import seed_replies, seed_base_replies, undo_replies
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_base_users()
    seed_users()
    seed_base_hearts()
    seed_hearts()
    seed_base_replies()
    seed_replies()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_hearts()
    undo_users()
    undo_replies
    # Add other undo functions here
