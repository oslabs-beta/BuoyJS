import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces } from '../../reducers/clustersSlice';
import Service from './Service.jsx'
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const Services = (props) => {

  const { openState } = props;

  const name_spaces = useSelector(selectNamespaces);

  const serviceArr = [];
  for (let i = 0; i < name_spaces.length; i++) {
    if (name_spaces[i].name === props.namespace) {
      for (let j = 0; j < name_spaces[i].services.length; j++) {
        serviceArr.push(<Service id={j} name={name_spaces[i].services[j].name} type={name_spaces[i].services[j].type} clusterIP={name_spaces[i].services[j].clusterIP} key={`service-${i}${j}`}/>)
      }
    }
  }

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openState);
  }, [ openState ]);

  return (
    <div className="ClustersContainer2">
        <div className="ClusterObjectsContainer">
          <div className="ClusterObjectsHeader">
            {!open && <button className="arrow" onClick={() => setOpen(!open)}><BsFillCaretRightFill /></button>}
            {open && <button className="arrow" onClick={() => setOpen(!open)}><BsFillCaretDownFill /></button>}
            <p> Services </p>
          </div>
          <div className="ClusterObjects"></div>
          <div className="List">
            {open && serviceArr[0] &&
            <div>
              {serviceArr}
            </div>}
          </div>
        </div>
    </div>
  );

}


export default Services;