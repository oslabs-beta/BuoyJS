import React from 'react';
import { useSelector } from 'react-redux';
import { selectNodeCpuUsage } from '../../reducers/networkSlice';
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


const NodeCPUChart = () => {
  
  const nodeCpuUsage = useSelector(selectNodeCpuUsage);
  const datasets = [];
  const colorArr = [];

  
  nodeCpuUsage.map( (node, idx) => {

    if (colorArr.length < idx + 1) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);

      colorArr.push({
        borderColor: `rgb(${r}, ${g}, ${b})`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
      });
    }

    datasets.push({
      label: node.nodeName,
      data: node.cpuUsage,
      borderColor: colorArr[idx].borderColor,
      backgroundColor: colorArr[idx].backgroundColor,
      borderWidth: 1,
    });
  });
  

  return (
    <div>
      <Line
        data={{
          labels: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0],
          datasets: datasets,
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default NodeCPUChart;