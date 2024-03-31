from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Change to your database :)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:&87TC4ANZtrWsypunz@localhost/lexilytics"
app.config["SQLALCHEMY_TRACK_MODIFCATIONS"] = False

db = SQLAlchemy(app)
