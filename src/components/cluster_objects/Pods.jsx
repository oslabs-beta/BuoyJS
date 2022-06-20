import React from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';

const Pods = (props) => {

  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Pods </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>

            { useSelector(selectNamespaces).map( namespace => {
              if (namespace.name === props.namespace) {
                return namespace.pods.map( (pod, idx) => {
                  return (
                    <div key={`${pod.name}${idx}`} className="pod-item">
                    <span>{pod.name}</span> <span>{pod.status}</span> <span>{ pod.podIP }</span>
                    </div>
                  )
                })
              }
            })}
          </div>
        </div>
    </div>
  );

}


export default Pods;