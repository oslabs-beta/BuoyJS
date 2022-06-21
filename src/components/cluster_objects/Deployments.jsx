import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';
import Depl from './Depl.jsx';
import { BsFillCaretDownSquareFill } from 'react-icons/bs';
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
  console.log('openState', openState);

  const [open, setOpen] = useState(openState);


  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Deployments </p>
            {open && <button class="arrow" onClick={() => setOpen(!open)}><BsFillCaretDownSquareFill /></button>}
            {!open && <button class="arrow" onClick={() => setOpen(!open)}><BsFillCaretRightFill /></button>}
          </div>
          <div className="ClusterObjects"></div>
          <div>
            {open && deplsArr[0] &&
            <div>
              {deplsArr}
            </div>}
          </div>
        </div>
    </div>
  );

}


export default Deployments;