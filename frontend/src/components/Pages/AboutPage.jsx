import React from 'react';
import { Container, Typography, Box, Paper, useTheme, useMediaQuery } from '@mui/material';

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Box my={4} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" color="primary" gutterBottom style={{ fontWeight: 600 }}>
          Welcome to LexiLytics!
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
            Where Text Meets Insight
        </Typography>
      </Box>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="center" alignItems="start">
        <Paper elevation={6} sx={{ p: 10, maxWidth: 1500, mx: 2, my: 2, backgroundColor: '#f0f0f0', borderLeft: '6px solid', borderColor: theme.palette.primary.main }}>
          
          <Typography variant="body1" paragraph style={{ fontSize: '1.1rem' }}>
          Imagine having a magnifying glass &#128270; that not only examines the surface but also uncovers 
          the secrets beneath the words. That’s what we offer—a fun, 
          insightful tool designed for anyone with a passion for text, from English majors and bookworms to linguistic enthusiasts and data scientists.
          </Typography>

          <Typography  variant="h5"  color="primary" gutterBottom style={{ fontWeight: 500, marginTop: theme.spacing(4)}}>What Makes LexiLytics Special?</Typography>
          <Typography variant="body1" paragraph style={{ fontSize: '1.1rem' }}>
            What sets LexiLytics apart is not just the depth of analysis but the joy of discovery. 
            It’s a vibrant playground for your words, where every sentence, every word, and every letter 
            is an opportunity for discovery. We blend sophisticated linguistic analysis with a dash of fun, 
            making it as enjoyable for a casual reader as it is powerful for a professional researcher.
            </Typography>
            <Typography component="div" style={{ fontSize: '1.1rem' }}>
            <ul style={{ paddingLeft: '20px', listStyleType: 'circle' }}>
                <li style={{ marginBottom: '10px' }}><strong><em>Peek Behind the Words:</em></strong> With our top-notch analysis, uncover the most frequent words hiding 
                    in your texts and see beyond the obvious.</li>
                <li style={{ marginBottom: '10px' }}><strong><em>Feel the Pulse of Your Text:</em></strong> Our sentiment analysis doesn’t just skim the surface. It dives deep,
                     measuring the emotional heartbeat of your writing.</li>
                <li style={{ marginBottom: '10px' }}><strong><em>Craft With Clarity:</em></strong> Our readability scores are like a friendly chat about making your text as clear and engaging as 
                    possible, inviting readers from all walks of life.</li>
                <li style={{ marginBottom: '10px' }}><strong><em>Discover the Rhythm:</em></strong> From the length of your sentences to the flow of your narrative, 
                    LexiLytics shows you the music in your writing.</li>
            </ul>
          </Typography>

          <Typography variant="h5"  color="primary" gutterBottom style={{ fontWeight: 500, marginTop: theme.spacing(4)}}>For Everyone Who Loves Text 📖</Typography>
          <Typography variant="body1" paragraph style={{ fontSize: '1.1rem' }}>
            Whether you’re polishing an essay, analyzing a favorite book, or crunching data for an 
            in-depth research project, LexiLytics is here to illuminate the path. We believe in the 
            power of understanding text—not just as a form of communication but as an art form 
            full of potential.
            </Typography>
            <Typography component="div" style={{ fontSize: '1.1rem' }}>
            <ul style={{ paddingLeft: '20px', listStyleType: 'circle' }}>
                <li style={{ marginBottom: '10px', }}><strong><em>For the Curious:</em></strong> Dive into the world of text analysis with an intuitive interface that guides you through the wonders of 
                    linguistic metrics.e</li>
                <li style={{ marginBottom: '10px' }}><strong><em>For the Scholars:</em></strong> Enhance your research with our advanced analytics, offering insights that can transform your understanding and 
                    engagement with text.</li>
                <li style={{ marginBottom: '10px' }}><strong><em>For the Storytellers:</em></strong> Explore the depth of your narratives, refine your style, and connect with your 
                    readers on a whole new level.</li>
            </ul>

          </Typography>

          <Typography variant="h5"  color="primary" gutterBottom style={{ fontWeight: 500, marginTop: theme.spacing(4)}}>Embark on Your Journey</Typography>
          <Typography variant="body1" paragraph style={{ fontSize: '1.1rem' }}>
            Ready to explore what your text has to say? Sign up and start your journey into 
            the fascinating world of text analysis. Unlock the hidden dimensions of language 
            and discover the joy of text analysis in a whole new way. 
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutPage;

