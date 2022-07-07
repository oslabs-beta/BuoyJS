/**
 * ************************************
 *
 * @module PodsCard.jsx
 * @author team Buoy
 * @description React Component for rendering Pod components in Clusters card
 *
 * ************************************
 */

import React from 'react';
import Pod from './Pod.jsx';

const PodsCard = (props) => { 
  return (
    <div className="objectsCardInfoCx">
      <p className="objectCardExpandHeader">Pods</p>
      <div className="ObjectCardContentCx">
      {
        props.namespace.pods.map( (pod,idx) => {
          return(
          <Pod
            key={`${pod.name}${idx}`}
            name={ pod.name }
            status={ pod.status }
            podIP ={ pod.podIP }
          />
          );
        })
      }
      </div>
    </div>
  );
};

export default PodsCard;