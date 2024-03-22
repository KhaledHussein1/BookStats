import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartSentenceDistribution = ({ sentenceDistribution }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={sentenceDistribution}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="length" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="frequency" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartSentenceDistribution;