import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import AnimatedCountUp from "../Charts/AnimatedCountUp";
import BarChartWordFreq from "../Charts/BarChartWordFreq";
import BarChartSentenceDistribution from "../Charts/BarChartSentenceDistribution";
import SentimentBarChart from '../Charts/SentimentBarChart';
import { 
    formatFrequentWordsData,
    formatSentenceDistributionData,
    formatSentimentCompositionData 
} from '../../utils/utils';

const AnalysisResults = () => {
    const location = useLocation();

    const wordCount = location.state?.wordCount;
    const frequentWords = location.state?.frequentWords;
    const sentenceDistribution = location.state?.sentenceDistribution;
    const sentimentComposition = location.state?.sentimentComposition;

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
                        {frequentWords && <BarChartWordFreq frequentWords={formatFrequentWordsData(frequentWords)} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentence Length Distribution Bar Chart</Typography>
                        {sentenceDistribution && <BarChartSentenceDistribution sentenceDistribution={formatSentenceDistributionData(sentenceDistribution)} />}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Sentiment Composition Bar Chart</Typography>
                        {sentimentComposition && <SentimentBarChart sentimentComposition={formatSentimentCompositionData(sentimentComposition)} />}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default AnalysisResults;
