import React, { useEffect, useState } from 'react';
import Deployments from './Deployments.jsx';
import Pods from './Pods.jsx';
import Services from './Services.jsx';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';

const Namespace = (props) => {

  const { name, status, allOpen, id } = props;

  const [open, setOpen] = useState(false);

  useEffect( () => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <div className="NamespaceContainer">
      <div className="namespace-item">
        <div className="NamespaceTitle">
          {open
            ? <button 
              className="arrow" 
              id="namespaceClose" 
              onClick={() => setOpen(!open)}>
                <BsFillCaretDownFill />
            </button>
            : <button 
            className="arrow" 
            id="namespaceOpen" 
            onClick={() => setOpen(!open)}>
              <BsFillCaretRightFill />
            </button>
          }
          <p id="name">{name}</p>
        </div>
        <p id={`${status}`}>{status}</p> 
      </div>
      <div className="NamelessContainer">
        {allOpen && !open && <Deployments openState={allOpen} key={`deployments${id}`} namespace={name}/>}
        {open && <Deployments openState={allOpen} key={`deployments${id}`} namespace={name}/>}


        {allOpen && !open && <Pods openState={allOpen} key={`pods${id}`} namespace={name}/>}
        {open && <Pods openState={allOpen} key={`pods${id}`} namespace={name}/>}

        {allOpen && !open && <Services openState={allOpen} key={`services${id}`} namespace={name}/>}
        {open && <Services openState={allOpen} key={`services${id}`} namespace={name}/>}
      </div>
    </div>
  );
};

export default Namespace;