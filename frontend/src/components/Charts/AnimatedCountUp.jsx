import React from "react";
import { useSpring, animated } from "react-spring";

const AnimatedCountUp = ({ end }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: end },
    config: { duration: 1000 },
  });

  return (
    <animated.span>
      {number.to((val) => Math.floor(val))}
    </animated.span>
  );
};

export default AnimatedCountUp;