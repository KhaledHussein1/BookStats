from flask import request, jsonify
from config import app, db
from models import Text

from collections import Counter
import re
from nltk.corpus import stopwords

import nltk
import matplotlib.pyplot as plt

# Function to find the most frequent words excluding stopwords
def most_freq_words(text):
    # Tokenize the text into words
    words = re.findall(r'\b\w+\b', text.lower())
    
    # Filter out stopwords
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]
    
    # Count the frequency of each word
    word_freq = Counter(words)
    
    # Get the top 20 most common words and their frequencies
    top_words_with_freq = word_freq.most_common(20)
    
    return top_words_with_freq

def word_count(text):
    words = text.split()
    return len(words)

def sentence_length_distribution(text):
    # Download the punkt tokenizer
    nltk.download('punkt')

    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # Calculate the length of each sentence
    sentence_lengths = [len(nltk.word_tokenize(sentence)) for sentence in sentences]
    
    return sentence_lengths

def sentiment_analysis(text):
    #overall sentiment
    #neg words
    #pos words
    return 0

def outlier_sentence(text):
    return 0

def readability(text):
    return 0

@app.route("/analysis/<int:text_id>", methods=["POST"])
def analyze_text(text_id):
    text = Text.query.get(text_id)

    if not text:
        return jsonify({"message": "Text not found."}), 404
    
    # Count words
    count_result = word_count(text.text)

    # Find most frequent words
    frequent_words = most_freq_words(text.text)

    sentence_len_dist = sentence_length_distribution(text.text)
    
    return jsonify({
        "word_count": count_result,
        "most_frequent_words": frequent_words,
        "sentence_length_distribution": sentence_len_dist})

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

