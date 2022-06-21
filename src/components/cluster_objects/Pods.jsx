import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';
import Pod from './Pod.jsx';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const Pods = (props) => {

  const { openState } = props; 

  const [open, setOpen] = useState(openState);

  const name_spaces = useSelector(selectNamespaces);

  const podsArr = [];
  for (let i = 0; i < name_spaces.length; i++) {
    if (name_spaces[i].name === props.namespace) {
      for (let j = 0; j < name_spaces[i].pods.length; j++) {
        podsArr.push(<Pod id={j} name={name_spaces[i].pods[j].name} status={name_spaces[i].pods[j].status} podIP={name_spaces[i].pods[j].podIP} key={`podsBox-${i}${j}`}/>);
      }
    }
  }

  return (
    <div className="ClustersContainer2">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            {!open && <button className="arrow" onClick={() => setOpen(!open)}><BsFillCaretRightFill /></button>}
            {open && <button className="arrow" onClick={() => setOpen(!open)}><BsFillCaretDownFill /></button>}
            <p> Pods </p>
          </div>
          <div className="ClusterObjects"></div>
          <div className="List">
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