import React, { memo, useSyncExternalStore } from 'react';
import { useSelector } from 'react-redux';
import { selectNodeCpuColors, selectNodeCpuTimestamp, selectNodeCpuUsage, selectNodeMemoryColors, selectNodeMemoryTimestamp, selectNodeMemoryUsage } from '../../reducers/networkSlice';
import NodeResourceChart from './NodeResourceChart.jsx';


const NodeChartsContainer = () => {
  
  const nodeCpuUsage = useSelector(selectNodeCpuUsage);
  const nodeCpuTimestamp = useSelector(selectNodeCpuTimestamp);
  const cpuColorArr = useSelector(selectNodeCpuColors);

  const nodeMemoryUsage = useSelector(selectNodeMemoryUsage);
  const nodeMemoryTimestamp = useSelector(selectNodeMemoryTimestamp);
  const memoryColorArr = useSelector(selectNodeMemoryColors);
  
  return (
    <div>
      <div class="chartContentCx">
        <div class="chartHeader">Node CPU Usage</div>
        <NodeResourceChart 
          nodeResourceUsage={nodeCpuUsage} 
          nodeResourceTimestamp={nodeCpuTimestamp}
          colorArr={cpuColorArr}
        />
      </div>
      <div class="chartContentCx">
        <div class="chartHeader">Node Memory Usage</div>
        <NodeResourceChart 
          nodeResourceUsage={nodeMemoryUsage}
          nodeResourceTimestamp={nodeMemoryTimestamp}
          colorArr={memoryColorArr}
        />
      </div>
    </div>
  );
};

export default NodeChartsContainer;