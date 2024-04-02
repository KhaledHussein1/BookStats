import React from 'react';
import { Paper, Container, Typography, Box, Grid, useTheme } from '@mui/material';
import SparkleText from '../animation/SparkleText';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SubjectIcon from '@mui/icons-material/Subject';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const theme = useTheme();

  return (
    <>
      <video autoPlay muted loop style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1', filter: 'blur(5px)' }}>
        <source src="/videos/book.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      <Container>
        <Box my={10} sx={{ textAlign: 'center', position: 'relative' }}>
        <SparkleText
          variant="h4"
          component="h2"
          color="primary"
          gutterBottom
        >
          Where Text Meets Insight
        </SparkleText>
          <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
            <Grid item xs={12} sm={6} md={4} >
              <Paper variant="elevation" elevation={24} sx={{minWidth:'300px', padding: '5px', backgroundColor: '#fafafa'}}>
              <Typography variant="h6" color="primary"><SearchIcon/> Word Frequency</Typography>
              <Typography variant="body1">Identify and visualize the most common words, cutting through the noise.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="elevation" elevation={24} sx={{minWidth:'300px', padding: '5px', backgroundColor: '#fafafa'}}>
              <Typography variant="h6" color="primary" ><TheaterComedyIcon /> Sentiment Analysis</Typography>
              <Typography variant="body1">Gauge the emotional undertone from texts, unveiling underlying sentiment.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="elevation" elevation={24} sx={{minWidth:'300px', padding: '5px', backgroundColor: '#fafafa'}}>
              <Typography variant="h6" color="primary"><MenuBookIcon /> Readability Scores</Typography>
              <Typography variant="body1">Evaluate your text with scores from popular readability tests.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="elevation" elevation={24} sx={{minWidth:'300px', padding: '5px', backgroundColor: '#fafafa'}}>
              <Typography variant="h6" color="primary"><TrendingUpIcon/> Letter & Word Count</Typography>
              <Typography variant="body1">Track the length and depth of texts with accurate counts.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="elevation" elevation={24} sx={{minWidth:'300px', padding: '5px', backgroundColor: '#fafafa'}}>
              <Typography variant="h6" color="primary"><BarChartIcon /> Summary Statistics</Typography>
              <Typography variant="body1">Get quick insights with summary stats on text structure.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper variant="elevation" elevation={24} sx={{minWidth:'300px', padding: '5px', backgroundColor: '#fafafa'}}>
              <Typography variant="h6" color="primary"><SubjectIcon/> Sentence Analysis</Typography>
              <Typography variant="body1">Explore sentence lengths and structures for balanced writing.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Home;
