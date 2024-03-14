from config import db 

class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    text = db.Column(db.Text, unique=False, nullable=False)

    def to_json(self):
        return{
            "id": self.id,
            "title": self.title,
            "text": self.text,
        }
