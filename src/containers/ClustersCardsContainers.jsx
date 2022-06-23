import React from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../reducers/clustersSlice';
import NamespaceCard from '../components/cluster_cards/NamespaceCard.jsx';

const ClustersCardsContainer = () => {

  return (
    <div className="clustersCardsContainer">
      <div className="clustersCardsContentCx">
        { useSelector(selectNamespaces).map(namespace => {
          return <NamespaceCard key={namespace.name} namespace={namespace} />
        })}
      </div>
    </div>
  );
}

export default ClustersCardsContainer;