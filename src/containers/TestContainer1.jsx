import React from 'react';
import ClusterObjects from '../components/ClusterObjects.jsx';

const TestContainer1 = () => {

  const objectsArr = [];
  for (let i = 0; i < 10; i++) {
    objectsArr.push(<ClusterObjects key={`clusterobject-${i}`}/>);
  }

  return( 
    <div className="ClustersOuterContainer">
      <div className="ApdexHeaderBox">
        <h1>Apdex Score</h1>
      </div>
      <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Objects </p>
          </div>
          <div className="ClusterObjects">
            { objectsArr }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestContainer1;