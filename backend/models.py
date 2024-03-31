from config import db 
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
    
class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    text = db.Column(MEDIUMTEXT, unique=False, nullable=False)

    def to_json(self):
        return{
            "id": self.id,
            "title": self.title,
            "text": self.text,
        }
