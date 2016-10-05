from flask import Flask
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc

from datetime import datetime

import bcrypt

app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(
    SECRET_KEY='development key',
    SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskr.db',
    SQLALCHEMY_TRACK_MODIFICATIONS = False
))

db = SQLAlchemy(app)

class Entry(db.Model):
    __tablename__ = 'entries'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    datetime = db.Column(db.DateTime(), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, title, text, user_id, datetime):
        self.title = title
        self.text = text
        self.user_id = user_id
        self.datetime = datetime

    def __repr__(self):
        return '<Entry %r %r %r %r>' % (self.title, self.text,
                                        self.user_id, self.datetime)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20),
                         nullable=False,
                         unique=True,
                         index=True)
    password = db.Column(db.String(60), nullable=False)    
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    entries = db.relationship('Entry', backref='user',
                              lazy='dynamic')

    def __init__(self, username, name, surname, email, password):
        self.username = username
        self.name = name
        self.surname = surname
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r %r %r %r>' % (self.username, self.email,
                                       self.name, self.surname)

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    db.create_all()
    print('Initialized the database.')
    
@app.route('/')
def show_entries():
    entries = Entry.query.order_by(Entry.datetime.desc()).all()
    return render_template('show_entries.html', entries=entries)

@app.route('/add', methods=['POST'])
def add_entry():
    user_id = session.get('user_id')
    if user_id is None:
        abort(401)
    entry = Entry(request.form['title'],
                  request.form['text'],
                  user_id,
                  datetime.now()
    )
    db.session.add(entry)
    db.session.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user is None:
            error = 'Invalid username'
        elif not bcrypt.checkpw(request.form['password'].encode('utf8'),
                                user.password):
            error = 'Invalid password'
        else:
            session['user_id'] = user.id
            session['username'] = user.username
            flash('You have been logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)

@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        if request.form['password'] != request.form['repeat-password']:
            error = 'Passwords do not match'
        else:
            password = bcrypt.hashpw(request.form['password'].encode('utf8'),
                                     bcrypt.gensalt())
            user = User(request.form['username'],
                        request.form['name'],
                        request.form['surname'],
                        request.form['email'],
                        password)
            db.session.add(user)
            try:
                db.session.commit()
                session['user_id'] = user.id
                session['username'] = user.username
            except exc.SQLAlchemyError as ex:
                error = 'Error inserting record in the database'
        if not error:
            flash('Registration successful')
            return redirect(url_for('show_entries'))
    return render_template('register.html', error=error)

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))
    
