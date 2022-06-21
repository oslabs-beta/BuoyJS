import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';
import Pod from './Pod.jsx';
import { BsFillCaretDownSquareFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const Pods = (props) => {

  const { openState } = props; 

  const [open, setOpen] = useState(openState);

  const name_spaces = useSelector(selectNamespaces);

  const podsArr = [];
  for (let i = 0; i < name_spaces.length; i++) {
    if (name_spaces[i].name === props.namespace) {
      for (let j = 0; j < name_spaces[i].deployments.length; j++) {
        podsArr.push(<Pod id={j} name={name_spaces[i].pods[j].name} status={name_spaces[i].pods[j].status} podIP={name_spaces[i].pods[j].podIP} key={`podsBox-${i}${j}`}/>);
      }
    }
  }

  return (
    <div className="ClustersContainer1">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            <p> Pods </p>
            {!open && <button class="arrow" onClick={() => setOpen(!open)}><BsFillCaretRightFill /></button>}
            {open && <button class="arrow" onClick={() => setOpen(!open)}><BsFillCaretDownSquareFill /></button>}
          </div>
          <div className="ClusterObjects"></div>
          <div>
            {open && podsArr[0] &&
            <div>
              {podsArr}
            </div>}
          </div>
        </div>
    </div>
  );

}


export default Pods;