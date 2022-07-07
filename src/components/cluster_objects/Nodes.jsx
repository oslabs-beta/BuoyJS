/**
 * ************************************
 *
 * @module Nodes.jsx
 * @author team Buoy
 * @description React Component for rendering multiple node components in Clusters page
 *
 * ************************************
 */

import React, { useState }from 'react';
import Node from './Node.jsx';
import { useSelector } from 'react-redux';
import { selectNodes } from '../../reducers/clustersSlice';

const Nodes = () => {

  const [allOpen, setAllOpen] = useState(false);
  const nodes = useSelector(selectNodes);

  const nodesArr = [];

  for (const [name, pods] of Object.entries(nodes)) {
    nodesArr.push(<Node 
      key={ name + pods.toString() } 
      allOpen={allOpen} 
      name={name}
      pods={pods}
      />);
  }

  return (
    <React.Fragment>
      <div className="PrimaryClusterObjectsHeader">
        <p id="currNamespaces">Nodes </p>
        {allOpen && <button className="expandAll" onClick={() => setAllOpen(!allOpen)}>Collapse All</button>}
        {!allOpen && <button className="expandAll" onClick={() => setAllOpen(!allOpen)}>Expand All</button>}
      </div>
      <div className="ClusterObjects">
        { nodesArr }
      </div>
    </React.Fragment>
  );
};

export default Nodes;