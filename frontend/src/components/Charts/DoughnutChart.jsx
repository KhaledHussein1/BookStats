import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';

const MyDoughnutChart = ({ sentimentComposition }) => {
    Chart.register(ArcElement);
    Chart.register(Tooltip);

    //Chart.overrides.doughnut.plugins.legend.display = true;
    //Chart.overrides.doughnut.plugins.legend.position = 'bottom';
    //Chart.overrides.doughnut.plugins.legend.labels.color = 'rgb(255, 99, 132)';

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
    
    const options = {
        plugins: {
            tooltip: {
                enabled: true,
            },
        }
    };

    return (
        <Doughnut 
            data={data}
            options={options}
        />
    );
};

export default MyDoughnutChart;
