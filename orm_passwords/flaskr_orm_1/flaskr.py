from flask import Flask
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default',
    SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskr.db',
    SQLALCHEMY_TRACK_MODIFICATIONS = False
))

db = SQLAlchemy(app)

class Entry(db.Model):
    __tablename__ = 'entries'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    text = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return '<Entry %r %r>' % (self.title, self.text)

@app.route('/')
def show_entries():
    entries = Entry.query.all()
    return render_template('show_entries.html', entries=entries)

@app.route('/add', methods=['POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)
    entry = Entry(title=request.form['title'], text=request.form['text'])
    db.session.add(entry)
    db.session.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))
    
