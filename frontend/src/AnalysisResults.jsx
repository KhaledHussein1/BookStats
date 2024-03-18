import React from "react";
import { useLocation } from "react-router-dom";
import AnimatedCountUp from "./AnimatedCountUp";
import BarChartWordFreq from "./BarChartWordFreq";

const AnalysisResults = () => {
    const location = useLocation();
    const wordCount = location.state?.wordCount;
    const frequentWords = location.state?.frequentWords;
    console.log("Word Count received:", wordCount);
    console.log("Frequent Words received:", frequentWords);

    // Transform frequentWords data to match the expected format
    const formattedData = frequentWords.map(([text, frequency]) => ({ text, frequency }));

    return (
        <div>
            <h2>Analysis Results</h2>
            {/* Animated count-up display */}
            <p>Word Count: <AnimatedCountUp end={wordCount} /></p>
            {/* Render frequent words */}
            {console.log("Frequent Words received:", frequentWords)}
            <p>Frequent Words: </p>
            <ul>
                {frequentWords && frequentWords.map((wordData, index) => (
                    <li key={index}>{wordData[0]}: {wordData[1]}</li>
                ))}
            </ul>
            {/* Render WordFrequencyBarChart component */}
            <h3>Word Frequency Bar Chart</h3>
            {frequentWords && <BarChartWordFreq frequentWords={formattedData} />}
        </div>
    );
};

export default AnalysisResults;
