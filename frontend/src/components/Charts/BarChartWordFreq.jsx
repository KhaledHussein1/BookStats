import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartWordFreq = ({ frequentWords }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={frequentWords}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="text" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="frequency" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartWordFreq;
