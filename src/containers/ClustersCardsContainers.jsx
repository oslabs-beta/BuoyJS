/**
 * ************************************
 *
 * @module ClustersCardsContainers.jsx
 * @author team Buoy
 * @description React Component for rendering Cluster Node Cards
 *
 * ************************************
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces, selectNodes } from '../reducers/clustersSlice';
import NamespaceCard from '../components/cluster_cards/NamespaceCard.jsx';
import NodesCard from '../components/cluster_cards/NodesCard.jsx';

const ClustersCardsContainer = () => {
  return (
    <div className="clustersCardsContainer">
      <div className="nodesHeader">Nodes</div>
        <div className="clustersCardsContentCx">
            { Object.entries(useSelector(selectNodes)).map(([key, value]) => {
              return <NodesCard 
                key={ key } 
                name={ key } 
                pods={ value } 
              />
            })}
        </div>
      <div className="nsHeader">Namespaces</div>
      <div className="clustersCardsContentCx">
        { useSelector(selectNamespaces).map(namespace => {
          return <NamespaceCard key={namespace.name} namespace={namespace} />
        })}
      </div>
    </div>
  );
};

export default ClustersCardsContainer;