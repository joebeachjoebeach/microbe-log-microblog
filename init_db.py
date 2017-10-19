# from datetime import datetime
from models import User, Post, db
from app import app
app.config.from_object('config')

with app.app_context():
    db.create_all()
 