import React from 'react';
import NodeResourceChart from './NodeResourceChart.jsx';

const NodesPodsResourceChart = (props) => {

  const { 
    node,

    nodesPodsCpuUsage, 
    nodesPodsCpuTimestamp, 
    nodesPodsCpuColorArr,

    nodesPodsMemoryUsage, 
    nodesPodsMemoryTimestamp, 
    nodesPodsMemoryColorArr,

  } = props;

  return (
    <React.Fragment key={`${node}PodsChart`}>
      <div className="nodeChartsHeader">{node}</div>
      <div className="chartContentCx">
        <div className="chartCx">
          <div className="chartHeader">Pods CPU Usage (Time in UTC vs CPU Usage %)</div>
          <NodeResourceChart 
            nodeResourceUsage={nodesPodsCpuUsage} 
            nodeResourceTimestamp={nodesPodsCpuTimestamp}
            colorArr={nodesPodsCpuColorArr}
          />
        </div>
        <div className="NodeCpuStatsCx">
        { nodesPodsCpuUsage.map((pod, idx) => {
          return (
          <div key={`${pod.name}Cpu${idx}`}>
            <span className="NodeCpuAttr">{pod.name}: </span>
            <span className="NodeCpuValue">{pod.resourceUsage[pod.resourceUsage.length - 1]}%</span>
          </div>
          );
        })}
        </div>
      </div>
      <div className="chartContentCx">
        <div className="chartCx">
          <div className="chartHeader">Pods Memory Usage (Time in UTC vs Memory Usage %)</div>
          <NodeResourceChart 
            nodeResourceUsage={nodesPodsMemoryUsage} 
            nodeResourceTimestamp={nodesPodsMemoryTimestamp}
            colorArr={nodesPodsMemoryColorArr}
          />
        </div>
        <div className="NodeMemoryStatsCx">
        { nodesPodsMemoryUsage.map((pod, idx) => {
          return (
          <div key={`${pod.name}Mem${idx}`}>
            <span className="NodeMemAttr">{pod.name}: </span>
            <span className="NodeMemValue">{pod.resourceUsage[pod.resourceUsage.length - 1]}%</span>
          </div>
          );
        })}
        </div>
      </div>
    </React.Fragment>
  );
}

 export default NodesPodsResourceChart;