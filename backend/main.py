from flask import request, jsonify
from config import app, db
from models import Text

@app.route("/texts", methods=["GET"])
def get_texts():
    texts = Text.query.all()
    json_texts = list(map(lambda x:x.to_json(), texts))
    return jsonify({"texts": json_texts})

@app.route("/create_text", methods=["POST"])
def create_text():
    title = request.json.get("title")
    text = request.json.get("text")

    if not title or not text:
        return (
            jsonify({"message": "You must include a title and text."}),
            400,
        )
    
    new_text = Text(title=title, text=text)
    try:
        db.session.add(new_text)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Text created!"}), 201

@app.route("/update_text/<int:text_id>", methods=["PATCH"])
def update_text(text_id):
    text = Text.query.get(text_id)

    if not text:
        return jsonify({"message": "Text not found."}), 404
    
    data = request.json
    text.title = data.get("title", text.title)
    text.text = data.get("text", text.text)

    db.session.commit()

    return jsonify({"message":"Text updated."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)

