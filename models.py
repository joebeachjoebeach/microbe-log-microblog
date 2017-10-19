from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

class User(db.Model):
    """User account"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), nullable=True, unique=True)
    username = db.Column(db.String(64), nullable=True, unique=True)
    password = db.Column(db.LargeBinary, nullable=True)
    salt = db.Column(db.LargeBinary, nullable=True)

    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.username}>'

    def __init__(self, email, username, password):
        """initializer"""

        self.salt = bcrypt.gensalt()
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), self.salt)
        self.username = username

    def password_is_valid(self, password):
        return self.password == bcrypt.hashpw(password.encode('utf-8'), self.salt)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Post {self.content}>'
