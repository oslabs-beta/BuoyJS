/**
 * ************************************
 *
 * @module Namespaces.jsx
 * @author team Buoy
 * @description React Component for rendering multiple namespaces in Clusters page
 *
 * ************************************
 */

import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';
import Namespace from './Namespace.jsx';


const Namespaces = () => {

  const name_spaces = useSelector(selectNamespaces);

  const [allOpen, setAllOpen] = useState(false);

  const namespaceArr = [];

  for (let i = 0; i < name_spaces.length; i++) {
    if (name_spaces[i].name) {
      namespaceArr.push(
        <Namespace 
          key={`${name_spaces[i].name}-${i}`} 
          id={i} 
          allOpen={allOpen} 
          name={name_spaces[i].name} 
          status={name_spaces[i].status}
        />
      );
    }
  }

  return (
    <React.Fragment>
      <div className="PrimaryClusterObjectsHeader">
        <p id="currNamespaces">Namespaces </p>
        {allOpen && <button className="expandAll" onClick={() => setAllOpen(!allOpen)}>Collapse All</button>}
        {!allOpen && <button className="expandAll" onClick={() => setAllOpen(!allOpen)}>Expand All</button>}
      </div>
      <div className="ClusterObjects">
        { namespaceArr }
      </div>
    </React.Fragment>
  );
};


export default Namespaces;