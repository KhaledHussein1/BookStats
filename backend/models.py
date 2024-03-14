from config import db 

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), unique=False, nullable=False)
    content = db.Column(db.Text, unique=False, nullable=False)
