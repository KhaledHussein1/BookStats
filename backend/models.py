from config import db 
from sqlalchemy.dialects.mysql import MEDIUMTEXT

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
