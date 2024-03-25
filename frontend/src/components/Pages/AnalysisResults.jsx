import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import AnimatedCountUp from "../charts/AnimatedCountUp";
import BarChartWordFreq from "../charts/BarChartWordFreq";
import BarChartSentenceDistribution from "../charts/BarChartSentenceDistribution";
import DoughnutChart from '../charts/DoughnutChart';
import { 
    formatFrequentWordsData,
    formatSentenceDistributionData,
} from '../../utils/utils';

const AnalysisResults = () => {
    const location = useLocation();

    const wordCount = location.state?.word_count;
    const frequentWords = location.state?.most_frequent_words;
    const sentenceDistribution = location.state?.sentence_length_distribution;
    const sentimentComposition = location.state?.sentiment_analysis;
    const summaryStatistics = location.state?.summary_statistics_sentence_length;

    console.log("Full Analysis Object:", location.state);
    //stats = [mean, median, mode_values, std, variance
    const arr = [1, 2];
    return (
        <div>
            <Typography variant="h2" gutterBottom>LexiLytics</Typography>
            {/* Animated count-up display */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Word Count</Typography>
                <AnimatedCountUp end={wordCount} />
            </Paper>

            {/* Summary statistics display */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Summary Statistics - Sentence Lengths</Typography>
                <h2>Mean: {summaryStatistics[0]}</h2>
                <h2>Median: {summaryStatistics[1]}</h2>
                <h2>Mode Value(s): {summaryStatistics[2].join(', ')}</h2>
                <h2>Standard Deviation: {summaryStatistics[3]}</h2>
                <h2>Variance: {summaryStatistics[4]}</h2>
            </Paper>

            {/* Render charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Word Frequency Bar Chart</Typography>
                        {frequentWords && <BarChartWordFreq frequentWords={formatFrequentWordsData(frequentWords)} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentence Length Distribution Bar Chart</Typography>
                        {sentenceDistribution && <BarChartSentenceDistribution sentenceDistribution={formatSentenceDistributionData(sentenceDistribution)} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentiment Analysis Doughnut Chart</Typography>
                        {sentimentComposition && <DoughnutChart sentimentComposition={sentimentComposition} />}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default AnalysisResults;
