from flask import request, jsonify
from config import app, db
from models import Text

from collections import Counter
import re
import numpy as np

#Natural Languaage Tool Kit
import nltk
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer


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
    # nltk.download('punkt')

    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # Calculate the length of each sentence
    sentence_lengths = [len(re.findall(r'\b\w+\b', sentence)) for sentence in sentences]
    
    return sentence_lengths
  
def sentiment_analysis(text):
    # Download the VADER lexicon
    #nltk.download('vader_lexicon')
    
    # Load the VADER sentiment analyzer
    vader = SentimentIntensityAnalyzer()

    # Calculate sentiment scores for the text
    sentiment_scores = vader.polarity_scores(text)
    return sentiment_scores

def readability(text):
    return 0

def summary_statistics(text):
    # tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # calculate length of each sentence
    sentence_lengths = [len(re.findall(r'\b\w+\b', sentence)) for sentence in sentences]\
    
    mean = np.mean(sentence_lengths)
    std = np.std(sentence_lengths)
    median = np.median(sentence_lengths)
    variance = np.var(sentence_lengths)

    # Get unique values and their counts
    unique_values, counts = np.unique(sentence_lengths, return_counts=True)
    # Find the index of the maximum count
    max_count_index = np.argmax(counts)
    # The mode(s) correspond to the unique value(s) with the maximum count
    mode_values = unique_values[counts == counts[max_count_index]]

    # Convert mode_values to a list
    mode_values = mode_values.tolist()

    stats = [mean, median, mode_values, std, variance]

    return stats

def longest_shortest_sentences(text):
    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # Find the longest and shortest sentence possible
    longest_sentence = max(sentences, key=lambda x: len(re.findall(r'\b\w+\b', x)))
    shortest_sentence = min(sentences, key=lambda x: len(re.findall(r'\b\w+\b', x)))

    shortest_sent_size = len(re.findall(r'\b\w+\b', shortest_sentence))
    longest_sent_size = len(re.findall(r'\b\w+\b', longest_sentence))

    # Find the shortest sentences with the same length as the min 
    shortest_sentences = [sentence for sentence in sentences if len(re.findall(r'\b\w+\b', sentence)) == shortest_sent_size]
    shortest_set = set()
    for sentence in shortest_sentences:
        sentence_without_quotes = sentence.replace('"', '').replace("'", '').replace('“','')
        shortest_set.add(sentence_without_quotes.strip())

    # Find the longest sentences with the same length as the max
    longest_sentences = [sentence for sentence in sentences if len(re.findall(r'\b\w+\b', sentence)) == longest_sent_size]
    longest_set = set()
    for sentence in longest_sentences:
        sentence_without_quotes = sentence.replace('\n\n', ' ').replace("\n", ' ')
        longest_set.add(sentence_without_quotes.strip())
    
    polar_sentences = [ list(shortest_set), list(longest_set)]

    return polar_sentences


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
    
    return jsonify({
        "word_count": count_result,
        "most_frequent_words": frequent_words,
        "sentence_length_distribution": sentence_len_dist,
        "sentiment_analysis": sentiment,
        "summary_statistics_sentence_length": summary_stats,
        "longest_and_shortest_sentences": longest_shortest_sent,})

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