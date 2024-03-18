import React from "react";
import { useLocation } from "react-router-dom";
import AnimatedCountUp from "./AnimatedCountUp";
import BarChartWordFreq from "./BarChartWordFreq";
import BarChartSentenceDistribution from "./BarChartSentenceDistribution";

const AnalysisResults = () => {
    const location = useLocation();

    const wordCount = location.state?.wordCount;
    const frequentWords = location.state?.frequentWords;
    const sentenceDistribution = location.state?.sentenceDistribution;

    console.log("Word Count received:", wordCount);
    console.log("Frequent Words received:", frequentWords);

    // Transform frequentWords data to match the expected format
    const freqWordformattedData = frequentWords.map(([text, frequency]) => ({ text, frequency }));

    // Create a frequency distribution of sentence lengths
    const sentenceLengths = sentenceDistribution.reduce((frequencyMap, length) => {
        frequencyMap[length] = (frequencyMap[length] || 0) + 1;
        return frequencyMap;
    }, {});
  
    // Transform the frequency distribution of sentence lengths to match the expected format
    const sentDistformattedData = Object.keys(sentenceLengths).map(length => ({
        length: parseInt(length), // Convert key to number
        frequency: sentenceLengths[length]
    }));

    return (
        <div>
            <h2>Analysis Results</h2>
            {/* Animated count-up display */}
            <p>Word Count: <AnimatedCountUp end={wordCount} /></p>
            {/* Render WordFrequencyBarChart component */}
            <h3>Word Frequency Bar Chart</h3>
            {frequentWords && <BarChartWordFreq frequentWords={freqWordformattedData} />}
            {/* Render SentenceDistributionBarChart component */}
            <h3>Sentence Length Distribution Bar Chart</h3>
            {sentenceDistribution && <BarChartSentenceDistribution sentenceDistribution={sentDistformattedData} />}
        </div>
    );
};

export default AnalysisResults;
