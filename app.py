from datetime import datetime, timezone
from flask import Flask, render_template, url_for, g, request, redirect, flash, session, abort
from flask_sqlalchemy import SQLAlchemy
from validate import validate_post, validate_email

app = Flask(__name__)
app.config.from_object('config')

from models import User, Post, db
db.init_app(app)

def utc_to_local(utc_dt):
    return utc_dt.replace(tzinfo=timezone.utc).astimezone(tz=None)

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    if ('user' in session):
        current_user = User.query.get(session['user'])
    else:
        current_user = None
    posts = Post.query.order_by(Post.id.desc())
    if request.method == 'GET':
        return render_template('index.html', posts=posts, current_user=current_user)
    
    if 'submit_post' in request.form:
        post_contents = request.form['contents']
        validation = validate_post(post_contents)
        if validation == 'too_long':
            flash('post must be 50 characters or less', 'post')
        elif validation == 'empty':
            flash('post may not be empty', 'post')
        elif validation == 'ok':
            post = Post(content=post_contents, timestamp=datetime.utcnow(), author=current_user)
            db.session.add(post)
            db.session.commit()

    return redirect(url_for('index'))


@app.route('/login', methods=['POST'])
def login():
    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])

    user = User.query.filter_by(username=POST_USERNAME).first()
    if user:
        if user.password_is_valid(POST_PASSWORD):
            session['user'] = user.id
        else:
            flash('invalid username or password', 'login')

    return redirect(url_for('index'))


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))


@app.route('/register', methods=['POST'])
def register():
    email = str(request.form['email'])
    username = str(request.form['username'])
    password = str(request.form['password'])
    password_verify = str(request.form['password-verify'])
    errors = False

    if password != password_verify:
        flash('passwords don\'t match', 'register')
        errors = True
    if User.query.filter_by(username=username).first():
        flash('sorry, that username is taken', 'register')
        errors = True
    if User.query.filter_by(email=email).first():
        flash('there is already an account with that email address', 'register')
        errors = True
    if not validate_email(email):
        flash('not a valid email address')
        errors = True
    if not errors:
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()
        flash('your account has been created successfully; please login', 'login')

    return redirect(url_for('index'))

@app.route('/delete', methods=['POST'])
def delete():
    # post_to_delete = Post.query.get(request.form[0])
    # db.session.delete(post_to_delete)
    # db.session.commit

    post_to_delete = Post.query.get(int(request.form['post_id']))
    db.session.delete(post_to_delete)
    db.session.commit()
    
    return redirect(url_for('index'))

app.jinja_env.globals.update(utc_to_local=utc_to_local)

if __name__ == '__main__':
    app.run()



































