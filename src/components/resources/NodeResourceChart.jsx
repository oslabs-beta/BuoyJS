import React from 'react';  
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const NodeResourceChart = (props) => {
  
  const { nodeResourceUsage, nodeResourceTimestamp, colorArr } = props;
  const datasets = [];
  
  nodeResourceUsage.map( (node, idx) => {
    datasets.push({
      label: node.name,
      data: node.resourceUsage,
      borderColor: colorArr[idx].borderColor,
      backgroundColor: colorArr[idx].backgroundColor,
      borderWidth: 1,
    });
  });
  
  return (
    <div>
      <Line
        data={{
          labels: nodeResourceTimestamp,
          datasets: datasets,
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default NodeResourceChart;