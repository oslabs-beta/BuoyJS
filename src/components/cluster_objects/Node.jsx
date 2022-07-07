/**
 * ************************************
 *
 * @module Node.jsx
 * @author team Buoy
 * @description React Component for rendering multiple node components in Clusters page
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';
import NodePods from './NodePods.jsx';

const Node = (props) => {

  const { name, pods, allOpen } = props;
  const [open, setOpen] = useState(false);

  useEffect( () => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <div className="NodeContainer">
      <div className="node-item">
        <div className="NodeTitle">
          {open
            ? <button 
              className="arrow" 
              id="nodeClose" 
              onClick={() => setOpen(!open)}>
                <BsFillCaretDownFill />
            </button>
            : <button 
            className="arrow" 
            id="nodeOpen" 
            onClick={() => setOpen(!open)}>
              <BsFillCaretRightFill />
            </button>
          }
          <p id="name">{name}</p>
        </div>
      </div>
      <div className="NamelessContainer">
        {allOpen && !open && <NodePods pods={pods} openState={allOpen} />}
        {open && <NodePods pods={pods} openState={allOpen} />}
      </div>
    </div>
  );
};

export default Node;