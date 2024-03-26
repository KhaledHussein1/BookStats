import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const DoughnutChart = ({ sentimentComposition }) => {
    const data = {
        labels: ['Negative', 'Positive', 'Neutral'],
        datasets: [{
            label: 'Sentiment',
            data: [
                sentimentComposition.neg,
                sentimentComposition.pos,
                sentimentComposition.neu
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
        }]
    };

    const legendItems = data.labels.map((label, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: data.datasets[0].backgroundColor[index], marginRight: '5px' }}></div>
            <span>{label}</span>
        </div>
    ));

    Chart.overrides.doughnut = {
        borderRadius: 10,
    };


    return (
        <div>
            <Doughnut data={data} />
            <div style={{ marginTop: '10px' }}>
                {legendItems}
            </div>
        </div>
    );
};

export default DoughnutChart;