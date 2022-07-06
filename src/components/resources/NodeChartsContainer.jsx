import React from 'react';
import { useSelector } from 'react-redux';
import { selectNodeCpuColors, selectNodeCpuTimestamp, selectNodeCpuUsage } from '../../reducers/networkSlice';
import NodeResourceChart from './NodeResourceChart.jsx';


const NodeChartsContainer = () => {
  
  const nodeCpuUsage = useSelector(selectNodeCpuUsage);
  const nodeCpuTimestamp = useSelector(selectNodeCpuTimestamp);
  const colorArr = useSelector(selectNodeCpuColors);
  
  return (
    <div>
      <NodeResourceChart 
        nodeResourceUsage={nodeCpuUsage} 
        nodeResourceTimestamp={nodeCpuTimestamp}
        colorArr={colorArr}
      />
    </div>
  );
};

export default NodeChartsContainer;