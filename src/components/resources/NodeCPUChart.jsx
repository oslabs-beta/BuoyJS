import React from 'react';
import { useSelector } from 'react-redux';
import { selectNodeCpuColors, selectNodeCpuTimestamp, selectNodeCpuUsage } from '../../reducers/networkSlice';
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
  const nodeCpuTimestamp = useSelector(selectNodeCpuTimestamp);
  const datasets = [];
  const colorArr = useSelector(selectNodeCpuColors);
  
  nodeCpuUsage.map( (node, idx) => {
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
          labels: nodeCpuTimestamp,
          datasets: datasets,
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default NodeCPUChart;