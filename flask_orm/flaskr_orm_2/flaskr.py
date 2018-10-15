from flask import Flask
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(
    SECRET_KEY='development key',
    SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskr.db',
    SQLALCHEMY_TRACK_MODIFICATIONS = False
))

app.config.from_envvar('FLASKR_SETTINGS', silent=True)

db = SQLAlchemy(app)

class Entry(db.Model):
    __tablename__ = 'entries'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    datetime = db.Column(db.DateTime(), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

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
    password = db.Column(db.String(30), nullable=False)    
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    entries = db.relationship('Entry', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r %r %r %r>' % (self.username, self.email,
                                       self.name, self.surname)
    
@app.route('/')
def show_entries():
    entries = Entry.query.order_by(Entry.datetime.desc()).all()
    return render_template('show_entries.html', entries=entries)

@app.route('/add', methods=['POST'])
def add_entry():
    user_id = session.get('user_id')
    if user_id is None:
        abort(401)
    entry = Entry(title=request.form['title'],
                  text=request.form['text'],
                  user_id=user_id,
                  datetime=datetime.now())
    
    db.session.add(entry)
    db.session.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        user = User.query.filter_by(
            username=request.form['username']).one_or_none():
        if user is None:
            error = 'Invalid username'
        elif request.form['password'] != user.password:
            error = 'Invalid password'
        else:
            session['user_id'] = user.id
            session['username'] = user.username
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))
    
