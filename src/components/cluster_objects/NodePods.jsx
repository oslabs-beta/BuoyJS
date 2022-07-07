/**
 * ************************************
 *
 * @module NodePods.jsx
 * @author team Buoy
 * @description React Component for rendering multiple node pods in Clusters page 
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react'; 
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';
import NodePod from './NodePod.jsx';

const NodePods = (props) => {

  const { pods, openState } = props; 

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openState);
  }, [ openState ]);

  const podsArr = pods.map( pod => {
    return <NodePod 
      key={`${pod.nodeName}${pod.name}`}
      name={pod.name}
      status={pod.status} 
      podIP={pod.podIP}
      />
  });

  return (
    <div className="ClustersContainer2">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            {!open && <button className="arrow" onClick={() => setOpen(!open)}><BsFillCaretRightFill /></button>}
            {open && <button className="arrow" onClick={() => setOpen(!open)}><BsFillCaretDownFill /></button>}
            <p> Pods </p>
          </div>
          <div className="ClusterObjects"></div>
          <div className="List">
            {open && podsArr[0] &&
            <div>
              {podsArr}
            </div>}
          </div>
        </div>
    </div>
  );
};


export default NodePods;