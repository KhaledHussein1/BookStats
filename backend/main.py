from flask import request, jsonify, session
from flask_login import login_user, logout_user, current_user, login_required
from config import app, db, bcrypt
from models import Text, User

from text_analysis import (
    most_freq_words, word_count, sentence_length_distribution, 
    sentiment_analysis, readability, summary_statistics, 
    longest_shortest_sentences, letter_count, sentence_count,
    )

# Initialize Flask-Login
from flask_login import LoginManager
login_manager = LoginManager()
login_manager.init_app(app)

'''
--------------User Account Endpoints---------------
'''
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required."}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists."}), 400
    
    user = User(username=username)
    user.set_password(password)  # This now uses the set_password method

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully."}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):  # Here you use check_password method
        # Login logic here. You might want to set up the user session or return a token
        login_user(user)  # Flask-Login's login_user to handle session
        return jsonify({"message": "Login successful.", "username": username}), 200
    else:
        return jsonify({"message": "Invalid username or password."}), 401


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful."}), 200

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

@app.route("/delete_text/<int:user_id>", methods=["DELETE"])
def delete_text(user_id):
    text = Text.query.get(user_id)

    if not text:
        return jsonify({"message": "Text not found"}), 404

    db.session.delete(text)
    db.session.commit()

    return jsonify({"message": "Text deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)