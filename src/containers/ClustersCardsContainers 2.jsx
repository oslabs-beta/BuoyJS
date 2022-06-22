import React from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../reducers/clustersSlice';
import NamespaceCard from '../components/cluster_cards/NamespaceCard.jsx';

const ClustersCardsContainer = () => {

  return (
    <div className="clustersCardsContainer">
      clustersCardsContainer
      <div>
        <div>Current Namespaces: { useSelector(selectNamespaces).length - 1 }</div>
      </div>
      <div className="clustersCardsContentCx">
        { useSelector(selectNamespaces).map(namespace => {
          return <NamespaceCard key={namespace.name} namespace={namespace} />
        })}
      </div>
    </div>
  );
}

export default ClustersCardsContainer;