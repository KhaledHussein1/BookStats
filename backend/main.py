from flask import request, jsonify
from config import app, db
from models import Text, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from text_analysis import (
    most_freq_words, word_count, sentence_length_distribution, 
    sentiment_analysis, readability, summary_statistics, 
    longest_shortest_sentences, letter_count, sentence_count,
    )

# User registration
@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400
    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=username)  # Issue token
    return jsonify(access_token=access_token), 201

# User login
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


'''
-------------------Analysis Endpoint-----------------------
'''
@app.route("/analysis/<int:text_id>", methods=["POST"])
def analyze_text(text_id):
    text = db.session.get(Text, text_id)

    if not text:
        return jsonify({"message": "Text not found."}), 404
    
    # Count words
    count_result = word_count(text.text)

    letter_count_result = letter_count(text.text)

    sentence_count_result = sentence_count(text.text)

    # Find most frequent words
    frequent_words = most_freq_words(text.text)

    # Find frequency distribution of sentence lengths
    sentence_len_dist = sentence_length_distribution(text.text)

    # Sentiment composition of text
    sentiment = sentiment_analysis(text.text)

    # Fundamental Summary Statistics of sentence lengths
    summary_stats = summary_statistics(text.text) 

    # Finds the shortest and longest sentences in the text
    longest_shortest_sent = longest_shortest_sentences(text.text)

    # 16 diffferent readability measurements
    readability_scores = readability(text.text)
    
    return jsonify({
        "word_count": count_result,
        "most_frequent_words": frequent_words,
        "sentence_length_distribution": sentence_len_dist,
        "sentiment_analysis": sentiment,
        "summary_statistics_sentence_length": summary_stats,
        "longest_and_shortest_sentences": longest_shortest_sent,
        "readability": readability_scores,
        "sentence_count": sentence_count_result,
        "letter_count": letter_count_result,
        })

'''
---------------------CRUD------------------------
'''
@app.route('/texts', methods=['GET'])
@jwt_required()
def get_texts():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    texts = Text.query.filter_by(user_id=user.id).all()
    return jsonify([text.to_json() for text in texts])

@app.route("/create_text", methods=["POST"])
@jwt_required()
def create_text():
    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()
    title = request.json.get("title")
    text = request.json.get("text")

    if not title or not text:
        return (
            jsonify({"message": "You must include a title and text."}),
            400,
        )
    
    new_text = Text(title=title, text=text, user_id=user.id)
    try:
        db.session.add(new_text)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Text created!"}), 201

@app.route("/update_text/<int:text_id>", methods=["PATCH"])
@jwt_required()
def update_text(text_id):
    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()
    text = Text.query.filter_by(id=text_id, user_id=user.id).first()

    if not text:
        return jsonify({"message": "Text not found or you don't have permission to update this text."}), 404
    
    data = request.json
    text.title = data.get("title", text.title)
    text.text = data.get("text", text.text)
    
    try:
        db.session.commit()
        return jsonify({"message": "Text updated."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Update failed: " + str(e)}), 500


@app.route("/delete_text/<int:text_id>", methods=["DELETE"])
@jwt_required()
def delete_text(text_id):
    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()
    text = Text.query.filter_by(id=text_id, user_id=user.id).first()

    if not text:
        return jsonify({"message": "Text not found or you don't have permission to delete this text."}), 404
    
    try:
        db.session.delete(text)
        db.session.commit()
        return jsonify({"message": "Text deleted."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Delete failed: " + str(e)}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)