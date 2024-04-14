import React from 'react';
import { Paper, Container, Typography, Box, Grid } from '@mui/material';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SubjectIcon from '@mui/icons-material/Subject';
import SearchIcon from '@mui/icons-material/Search';
import Particles from '../animation/ParticlesHome';

function Home() {
  return (
    <> 
    <Particles />
      <Container>
        <Box my={10} sx={{ textAlign: 'center', position: 'relative' }}>
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
