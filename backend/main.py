from flask import request, jsonify
from config import app, db
from models import Text

from text_analysis import (
    most_freq_words, word_count, sentence_length_distribution, 
    sentiment_analysis, readability, summary_statistics, 
    longest_shortest_sentences
    )

@app.route("/analysis/<int:text_id>", methods=["POST"])
def analyze_text(text_id):
    text = db.session.get(Text, text_id)

    if not text:
        return jsonify({"message": "Text not found."}), 404
    
    # Count words
    count_result = word_count(text.text)

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
        "readability": readability_scores,})

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