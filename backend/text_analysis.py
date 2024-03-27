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