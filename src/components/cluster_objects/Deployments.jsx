/**
 * ************************************
 *
 * @module Deployments.jsx
 * @author team Buoy
 * @description React Component for rendering list of deployments components
 *
 * ************************************
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';
import Depl from './Depl.jsx';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const Deployments = (props) => {  

  const name_spaces = useSelector(selectNamespaces);

  const deplsArr = [];
  for (let i = 0; i < name_spaces.length; i++) {
    if (name_spaces[i].name === props.namespace) {
      for (let j = 0; j < name_spaces[i].deployments.length; j++) {
        deplsArr.push(<Depl id={j} name={name_spaces[i].deployments[j].name} replicas={name_spaces[i].deployments[j].replicas} key={`deplBox-${i}${j}`}/>)
      }
    }
  }

  const { openState } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openState);
  }, [ openState ]);

  return (
    <div className="ClustersContainer2">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            {open && 
              <button 
                className="arrow" 
                onClick={() => setOpen(!open)}
              >
                <BsFillCaretDownFill />
              </button>}
            {!open && 
              <button 
                className="arrow" 
                onClick={() => 
                setOpen(!open)
              }>
                <BsFillCaretRightFill />
              </button>}
            <p> Deployments </p>
          </div>
          <div className="List">
            {open && deplsArr[0] &&
            <div>
              {deplsArr}
            </div>}
          </div>
        </div>
    </div>
  );
};


export default Deployments;