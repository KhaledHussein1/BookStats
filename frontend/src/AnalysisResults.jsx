import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import AnimatedCountUp from "./AnimatedCountUp";
import BarChartWordFreq from "./BarChartWordFreq";
import BarChartSentenceDistribution from "./BarChartSentenceDistribution";
import SentimentBarChart from './SentimentBarChart';

const AnalysisResults = () => {
    const location = useLocation();

    const wordCount = location.state?.wordCount;
    const frequentWords = location.state?.frequentWords;
    const sentenceDistribution = location.state?.sentenceDistribution;
    const sentimentComposition = location.state?.sentimentComposition;

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

    // Transform the data into the expected format
    const sentimentCompositionFormattedData = {
        name: 'Sentiment Composition',
        negative: sentimentComposition.neg,
        positive: sentimentComposition.pos,
        neutral: sentimentComposition.neu,
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>LexiLytics</Typography>
            {/* Animated count-up display */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Word Count</Typography>
                <AnimatedCountUp end={wordCount} />
            </Paper>

            {/* Render charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Word Frequency Bar Chart</Typography>
                        {frequentWords && <BarChartWordFreq frequentWords={freqWordformattedData} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentence Length Distribution Bar Chart</Typography>
                        {sentenceDistribution && <BarChartSentenceDistribution sentenceDistribution={sentDistformattedData} />}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentiment Composition Bar Chart</Typography>
                        {sentimentComposition && <SentimentBarChart sentimentComposition={sentimentCompositionFormattedData} />}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default AnalysisResults;
