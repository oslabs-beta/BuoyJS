import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';
import { addPods } from '../../reducers/clustersSlice';

const Pods = (props) => {

  const [ pods, setPods ] = useState([]);
  const dispatch = useDispatch();

  useEffect( () => {

    ipcRenderer.send('load:pods');
    ipcRenderer.on('get:pods', (e, data) => {
      dispatch(addPods(data));
      setPods(data);
    });
    
  }, []);
  
  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Pods </p>
          </div>
          <div className="ClusterObjects"></div>
          <div>
            { pods.map( (pod, idx) => {
              // console.log('pod namespace: ', pod.namespace);
              // console.log('props namespace: ', props.namespace);
              if (pod.namespace == props.namespace) {
                return (
                  <div key={`${pod}${idx}`} className="pod-item">
                  <span>{pod.name}</span> <span>{pod.status}</span> <span>{ pod.podIP }</span>
                  </div>
                );
              };
            }
            )}
          </div>
        </div>
    </div>
  );

}


export default Pods;