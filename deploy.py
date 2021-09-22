import os

os.system("pipenv lock -r > requirements.txt")
os.system("heroku container:push web -a heart-string")
os.system("heroku container:release web -a heart-string"
)
# os.system("heroku run -a heart-string flask seed undo")
os.system("heroku run -a heart-string flask db upgrade")
os.system("heroku run -a heart-string flask seed all")
