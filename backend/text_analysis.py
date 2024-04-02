from collections import Counter
import re
import numpy as np

#Natural Languaage Tool Kit
import nltk
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer

import textstat

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
    lexicon_count = textstat.lexicon_count(text, removepunct=True)
    
    # Another way of doing it, not sure which is more accurate. -
    # words = text.split()
    # word_count = len(words)
    
    return lexicon_count

def sentence_count(text):
    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)
    
    # Count the number of sentences
    num_sentences = len(sentences)
    
    return num_sentences

def letter_count(text):
    # Use regular expression to find all letters (including accented ones)
    letters = re.findall(r'[a-zA-ZÀ-ÿ]', text)
    letter_count = len(letters)

    return letter_count

def sentence_length_distribution(text):
    # Download the punkt tokenizer
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')

    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # Calculate the length of each sentence
    sentence_lengths = [len(re.findall(r'\b\w+\b', sentence)) for sentence in sentences]
    
    return sentence_lengths
  
def sentiment_analysis(text):
    # Download the VADER lexicon
    try:
        nltk.data.find('sentiment/vader_lexicon')
    except LookupError:
        nltk.download('vader_lexicon')
    
    # Load the VADER sentiment analyzer
    vader = SentimentIntensityAnalyzer()

    # Calculate sentiment scores for the text
    sentiment_scores = vader.polarity_scores(text)
    return sentiment_scores

def readability(text):
    # Compute readability scores
    flesch_reading_ease = textstat.flesch_reading_ease(text)
    flesch_kincaid_grade = textstat.flesch_kincaid_grade(text)
    gunning_fog_index = textstat.gunning_fog(text)
    dale_chall = textstat.dale_chall_readability_score(text)
    smog_index = textstat.smog_index(text)
    coleman_liau_index = textstat.coleman_liau_index(text)
    automated_readability_index = textstat.automated_readability_index(text)
    difficult_words = textstat.difficult_words(text)
    linsear_write_formula = textstat.linsear_write_formula(text)
    text_standard = textstat.text_standard(text)
    fernandez_huerta = textstat.fernandez_huerta(text)
    szigriszt_pazos = textstat.szigriszt_pazos(text)
    gutierrez_polini = textstat.gutierrez_polini(text)
    crawford = textstat.crawford(text)
    gulpease_index = textstat.gulpease_index(text)
    osman = textstat.osman(text)
    
    # Create a dictionary
    readability_scores = {
        'flesch_reading_ease': flesch_reading_ease,
        'flesch_kincaid_grade': flesch_kincaid_grade,
        'gunning_fog_index': gunning_fog_index,
        'dale_chall': dale_chall,
        'smog_index': smog_index,
        'coleman_liau_index': coleman_liau_index,
        'automated_readability_index': automated_readability_index,
        'difficult_words': difficult_words,
        'linsear_write_formula': linsear_write_formula,
        'text_standard': text_standard,
        'fernandez_huerta': fernandez_huerta,
        'szigriszt_pazos': szigriszt_pazos,
        'gutierrez_polini': gutierrez_polini,
        'crawford': crawford,
        'gulpease_index': gulpease_index,
        'osman': osman
    }
    return readability_scores

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