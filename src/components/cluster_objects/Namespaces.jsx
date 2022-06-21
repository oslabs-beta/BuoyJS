import React from 'react';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNamespaces, addDeployments, addPods, addServices, selectNamespaces } from '../../reducers/clustersSlice';
import Deployments from './Deployments.jsx';
import Pods from './Pods.jsx';
import Services from './Services.jsx';
import { BsFillCaretDownSquareFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';



const Namespaces = () => {
  
  const dispatch = useDispatch();

  useEffect( () => {

    ipcRenderer.send('load:namespaces');
    const namespaceEvtTgt = ipcRenderer.on('get:namespaces', (e, data) => {
      dispatch(addNamespaces(data));
    });

    ipcRenderer.send('load:deployments');
    const deploymentEvtTgt = ipcRenderer.on('get:deployments', (e, data) => {
      dispatch(addDeployments(data));
      console.log("here: ", e);
    });

    ipcRenderer.send('load:pods');
    const podEvtTgt = ipcRenderer.on('get:pods', (e, data) => {
      dispatch(addPods(data));
    });

    ipcRenderer.send('load:services');
    const serviceEvtTgt = ipcRenderer.on('get:services', (e, data) => {
      dispatch(addServices(data));
    });

  }, []);

  const [open, setOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);

  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="PrimaryClusterObjectsHeader">
            <p id="currNamespaces"> Current Namespaces </p>
            {!open && <button class="arrow" id="namespaceOpen" onClick={() => setOpen(!open)}><BsFillCaretRightFill /></button>}
            {open && <button class="arrow" id="namespaceClose" onClick={() => setOpen(!open)}><BsFillCaretDownSquareFill /></button>}
            {allOpen && <button class="expandAll" onClick={() => setAllOpen(!allOpen)}>Collapse All</button>}
            {!allOpen && <button class="expandAll" onClick={() => setAllOpen(!allOpen)}>Expand All</button>}

          </div>
          <div className="ClusterObjects">
          </div>
          <div>
            { useSelector(selectNamespaces).map( (namespace, idx) => {
              if (namespace.name) {
                return (
                  <div key={`namespaces${idx}`} className="NamespaceContainer">
                    <div key={`${namespace.name}${idx}`} className="namespace-item">
                      <p id="name">{namespace.name}</p>
                      <p id={`${namespace.status}`}>{namespace.status}</p> 
                    </div>
                    {allOpen && <Deployments openState={allOpen} key={`deployments${idx}`} namespace={namespace.name}/>}
                    {open && !allOpen && <Deployments openState={allOpen} key={`deployments${idx}`} namespace={namespace.name}/>}


                    {allOpen && <Pods openState={allOpen} key={`pods${idx}`} namespace={namespace.name}/>}
                    {open && !allOpen && <Pods openState={allOpen} key={`pods${idx}`} namespace={namespace.name}/>}


                    {allOpen && <Services openState={allOpen} key={`services${idx}`} namespace={namespace.name}/>}
                    {open && !allOpen && <Services openState={allOpen} key={`services${idx}`} namespace={namespace.name}/>}
                  </div>
                );
              }
            }
            )}
          </div>
        </div>
    </div>
  );

}


export default Namespaces;