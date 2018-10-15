from sqlalchemy.sql import func

from flaskr import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120),
                         nullable=False,
                         unique=True,
                         index=True)
    password = db.Column(db.String(150), nullable=False)    

    def __repr__(self):
        return '<User %r>' % (self.username,)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    created = db.Column(db.DateTime(), nullable=False,
                     server_default=func.now())    
    author_id = db.Column(db.Integer,
                          db.ForeignKey('users.id'),
                          nullable=False)
    author = db.relationship('User', lazy=True,
                             backref=db.backref('posts', lazy=True))
    

    def __repr__(self):
        return '<Post %r %r %r>' % (self.title, self.body, self.author.username)
