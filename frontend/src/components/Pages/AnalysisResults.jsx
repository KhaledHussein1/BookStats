import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import AnimatedCountUp from "../charts/AnimatedCountUp";
import BarChartWordFreq from "../charts/BarChartWordFreq";
import BarChartSentenceDistribution from "../charts/BarChartSentenceDistribution";
import SummaryStatisticsTable from "../tables/SummaryStatisticsTable";
import ReadabilityTable from "../tables/ReadabilityTable";
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
    const longAndShortSentences = location.state?.longest_and_shortest_sentences;
    const readabilityScores = location.state?.readability;
    const letterCount = location.state?.letter_count;
    const sentenceCount = location.state?.sentence_count;

    console.log("Full Analysis Object:", location.state);
    
    return (
        <div style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
            {/* Animated count-up display */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Word Count</Typography>
                <AnimatedCountUp end={wordCount} />
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Letter Count</Typography>
                <AnimatedCountUp end={letterCount} />
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Sentence Count</Typography>
                <AnimatedCountUp end={sentenceCount} />
            </Paper>
            </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                {/* Summary statistics display */}
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h4" gutterBottom>Sentence Length Summary Statistics</Typography>
                    {summaryStatistics && <SummaryStatisticsTable summaryStatistics={summaryStatistics} />}
                </Paper>
                <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentiment Analysis Doughnut Chart</Typography>
                        {sentimentComposition && <DoughnutChart sentimentComposition={sentimentComposition} />}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                {/* Readability display */}
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h4" gutterBottom>Readability Scores Table</Typography>
                    {readabilityScores && <ReadabilityTable readabilityScores={readabilityScores} />}
                </Paper>
                </Grid>
            </Grid>

            {/* Shortest & Longest Sentences display */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Shortest Sentence(s)</Typography>
                <ul>
                    {longAndShortSentences[0].map((sentence,index) => (
                        <li key={index} style={{ fontSize: '24px'}}>{sentence}</li>
                    ))}
                </ul>
                <Typography variant="h4" gutterBottom>Longest Sentence(s)</Typography>
                <ul>
                    {longAndShortSentences[1].map((sentence,index) => (
                        <li key={index} style={{ fontSize: '24px'}}>{sentence}</li>
                    ))}
                </ul>
            </Paper>

            {/* Render charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Word Frequency Bar Chart</Typography>
                        {frequentWords && <BarChartWordFreq frequentWords={formatFrequentWordsData(frequentWords)} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentence Length Distribution Bar Chart</Typography>
                        {sentenceDistribution && <BarChartSentenceDistribution sentenceDistribution={formatSentenceDistributionData(sentenceDistribution)} />}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default AnalysisResults;
