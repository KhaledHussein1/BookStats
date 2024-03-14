from flask import request, jsonify
from config import app,db
from models import Book

@app.route("/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    json_books = list(map(lambda x:x.to_json(), books))
    return jsonify({"books": json_books})

@app.route("/create_book", methods=["POST"])
def create_contact():
    title = request.json.get("title")
    content = request.json.get("content")

    if not title or not content:
        return (
            jsonify({"message": "You must include a title and content."}),
            400,
        )
    
    new_book = Book(title=title, content=content)
    try:
        db.session.add(new_book)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Book created!"}), 201

@app.route("/update_book/<int:book_id>", methods=["PATCH"])
def update_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found."}), 404
    
    data = request.json
    book.title = data.get("title", book.title)
    book.content = data.get("content", book.content)

    db.session.commit()

    return jsonify({"message":"Book updated."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)

