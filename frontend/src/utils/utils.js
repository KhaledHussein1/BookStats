// Utility Functions for Data Transformations

export const formatFrequentWordsData = (frequentWords) => {
    return frequentWords.map(([text, frequency]) => ({ text, frequency }));
};

export const formatSentenceDistributionData = (sentenceDistribution) => {
    const sentenceLengths = sentenceDistribution.reduce((frequencyMap, length) => {
        frequencyMap[length] = (frequencyMap[length] || 0) + 1;
        return frequencyMap;
    }, {});

    return Object.keys(sentenceLengths).map(length => ({
        length: parseInt(length),
        frequency: sentenceLengths[length]
    }));
};

export const formatSentimentCompositionData = (sentimentComposition) => {
    return {
        name: 'Sentiment Composition',
        negative: sentimentComposition.neg,
        positive: sentimentComposition.pos,
        neutral: sentimentComposition.neu,
    };
};
