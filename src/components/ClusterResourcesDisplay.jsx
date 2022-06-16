import React from 'react';
import { ProgressPlugin } from 'webpack';
import ClusterResourcesCard from './ClusterResourcesCard.jsx';

const ClusterResourcesDisplay = () => {
  
  // again, not sure where cluster resource data will be coming from
    // will need to insert props into components once resolved.
  // const mapStateToProps = state => {
  //   return (
  //     clusters: ,
  //     latency: ,
  //     rps: ,
  //     errorRate: ,
  //     networkSat:
  //   );
  // }

  // something like this to pull cluster data, perhaps...
  
  // const clusterResources = [];  // gather cluster resource data from back end, collect in an array
  // props.clusters.forEach((cluster, i) => {
  //   ClusterResourcesDisplay.push(<ClusterResourcesCard key={i} id={i} latency={cluster.latency} rps={cluster.rps} errorRate={cluster.errorRate} networkSat={cluster.networkSat} />)
  // })
  
  return (
    <div className="ClusResDispContainer">
      <h1>Cluster Resources</h1>
      <ClusterResourcesCard />      {/*<--- for now*/} 
      {/* {clusterResources} */}    {/*<--- eventually*/} 
    </div>
  )
}

// export default connect(mapStateToProps, null)(ClusterResourcesDisplay);   // --> uncomment if mapStateToProps used
export default ClusterResourcesDisplay;