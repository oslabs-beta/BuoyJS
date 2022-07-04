import React from 'react';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNamespaces, addDeployments, addPods, addServices, selectNamespaces } from '../../reducers/clustersSlice';
import Namespace from './Namespace.jsx';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';



const Namespaces = () => {

  const name_spaces = useSelector(selectNamespaces);

  const [allOpen, setAllOpen] = useState(false);

  const namespaceArr =[];

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
    <div className="ClustersContainer1">
      <div className="ClusterObjectsContainer">
        <div className="PrimaryClusterObjectsHeader">
          <p id="currNamespaces"> Current Namespaces </p>
          {allOpen && <button className="expandAll" onClick={() => setAllOpen(!allOpen)}>Collapse All</button>}
          {!allOpen && <button className="expandAll" onClick={() => setAllOpen(!allOpen)}>Expand All</button>}
        </div>
        <div className="ClusterObjects">
          { namespaceArr }
        </div>
      </div>
    </div>
  );

}


export default Namespaces;