import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Typography } from '@mui/material';
import ArrowIcon from '@mui/icons-material/South';

const generateSparkles = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    delay: Math.random() * 1000, // Random delay for each sparkle
    duration: 2000 + Math.random() * 2000, // Random duration for each sparkle
    top: '-45px', // Adjust if you want different vertical positions
    left: `${34 + index * (40 / count)}%`, // Spread sparkles across the width
  }));
};

const SparkleText = ({ children, variant, component, color, gutterBottom }) => {
  const sparkles = generateSparkles(4); // Generate 5 sparkles
  
  return (
    <Typography
      variant={variant}
      component={component}
      color={color}
      gutterBottom={gutterBottom}
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
    >
      {sparkles.map((sparkle) => {
        const animation = useSpring({
          loop: true,
          from: { opacity: 0, transform: 'translateY(-100%) scale(0.5)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1.5)' },
          delay: sparkle.delay,
          config: { duration: sparkle.duration },
        });
        
        return (
          <animated.span
            key={sparkle.id}
            style={{
              ...animation,
              position: 'absolute',
              top: sparkle.top,
              left: sparkle.left,
            }}
          >
            <ArrowIcon/>
          </animated.span>
        );
      })}
      {children}
    </Typography>
  );
};

export default SparkleText;
