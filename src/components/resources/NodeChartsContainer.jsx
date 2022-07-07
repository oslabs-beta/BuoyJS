/**
 * ************************************
 *
 * @module NodeChartsContainer.jsx
 * @author team Buoy
 * @description React Component for rendering resource graph components
 *
 * ************************************
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectNodeCpuColors, 
  selectNodeCpuTimestamp, 
  selectNodeCpuUsage, 
  selectNodeMemoryColors, 
  selectNodeMemoryTimestamp, 
  selectNodeMemoryUsage, 
  selectNodeMemoryMBUsage,
  selectNodesPodsCpuColors,
  selectNodesPodsCpuUsage,
  selectNodesPodsCpuTimestamp,
  selectNodesPodsMemoryColors,
  selectNodesPodsMemoryUsage,
  selectNodesPodsMemoryTimestamp
} from '../../reducers/networkSlice';

import NodeResourceChart from './NodeResourceChart.jsx';
import NodesPodsResourceChart from './NodesPodsResourceChart.jsx';


const NodeChartsContainer = () => {
  
  const nodeCpuUsage = useSelector(selectNodeCpuUsage);
  const nodeCpuTimestamp = useSelector(selectNodeCpuTimestamp);
  const cpuColorArr = useSelector(selectNodeCpuColors);

  const nodeMemoryUsage = useSelector(selectNodeMemoryUsage);
  const nodeMemoryMBUsage = useSelector(selectNodeMemoryMBUsage);
  const nodeMemoryTimestamp = useSelector(selectNodeMemoryTimestamp);
  const memoryColorArr = useSelector(selectNodeMemoryColors);

  const nodesPodsCpuUsage = useSelector(selectNodesPodsCpuUsage);
  const nodesPodsCpuTimestamp = useSelector(selectNodesPodsCpuTimestamp);
  const nodesPodsCpuColorArr = useSelector(selectNodesPodsCpuColors);

  const nodesPodsMemoryUsage = useSelector(selectNodesPodsMemoryUsage);
  const nodesPodsMemoryTimestamp = useSelector(selectNodesPodsMemoryTimestamp);
  const nodesPodsMemoryColorArr = useSelector(selectNodesPodsMemoryColors);

  const nodesCpu = Object.keys(nodesPodsCpuUsage).sort();

  const nodesPodsCpuArr = nodesCpu.map( node => {
    return(
      <NodesPodsResourceChart 
        key={`${node}PodsChart`}
        node={node}
        
        nodesPodsCpuUsage={nodesPodsCpuUsage[node]} 
        nodesPodsCpuTimestamp={nodesPodsCpuTimestamp}
        nodesPodsCpuColorArr={nodesPodsCpuColorArr[node]}

        nodesPodsMemoryUsage={nodesPodsMemoryUsage[node]}
        nodesPodsMemoryTimestamp={nodesPodsMemoryTimestamp}
        nodesPodsMemoryColorArr={nodesPodsMemoryColorArr[node]}
      />
    );
  });
  
  return (
    <div className="nodeChartsCx">
      <div className="nodeChartsHeader">All Nodes</div>
      <div className="chartContentCx">
        <div className="chartCx">
          <div className="chartHeader">Node CPU Usage (Time in UTC vs CPU Usage %)</div>
          <NodeResourceChart 
            nodeResourceUsage={nodeCpuUsage} 
            nodeResourceTimestamp={nodeCpuTimestamp}
            colorArr={cpuColorArr}
          />
        </div>
        <div className="NodeCpuStatsCx">
          { nodeCpuUsage.map( (node, idx) => {
            return (
            <div key={`${node.name}Cpu${idx}`}>
              <span className="NodeCpuAttr">{node.name}: </span>
              <span className="NodeCpuValue">{node.resourceUsage[node.resourceUsage.length - 1]}%</span>
            </div>
            );
          })} 
        </div>
      </div>
      <div className="chartContentCx">
        <div className="chartCx">
          <div className="chartHeader">Node Memory Usage (Time in UTC vs Mem Usage %)</div>
          <NodeResourceChart 
            nodeResourceUsage={nodeMemoryUsage}
            nodeResourceTimestamp={nodeMemoryTimestamp}
            colorArr={memoryColorArr}
          />
        </div>
        <div className="NodeMemoryStatsCx">
          { nodeMemoryMBUsage.map( (node, idx) => {
            return (
            <div key={`${node.name}Mem${idx}`}>
              <span className="NodeMemAttr">{node.name}: </span>
              <span className="NodeMemValue">{node.resourceUsage} MB</span>
            </div>
            );
          })} 
        </div>
      </div>
      { nodesPodsCpuArr }
    </div>
  );
};

export default NodeChartsContainer;