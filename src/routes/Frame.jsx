import React, { useState } from 'react';

import { AiFillCloseCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { GiPlainCircle } from 'react-icons/gi';
// import { BsFillCircleFill } from 'react-icons/bs';
import { ipcRenderer } from 'electron';

const Frame = () => {

  const [ active, setActive ] = useState(false);

  const closeApp = () => {
    ipcRenderer.send('close-app');
  };

  const minimizeApp = () => {
    ipcRenderer.send('minimize-app');
  };

  const maximizeApp = () => {
    ipcRenderer.send('maximize-app');
  };

  return (
  <React.Fragment>
    <div className="frameSeparator">
      <button>
        <GiPlainCircle />
      </button>
    </div>
    <div className="frameBar">
      <div className="frameTitle">Buoy</div>
      <div className="frameButtons"
          onMouseEnter={ () => { setActive(true); console.log(active); }}
          onMouseLeave={ () => { setActive(false); console.log(active); }}
      >
        <button 
          id="closeAppButton" 
          onClick={() => closeApp()}>
          {active ? <AiFillCloseCircle /> : <GiPlainCircle />}
        </button>
        <button 
          id="minimizeAppButton" 
          onClick={() => minimizeApp()}>
          {active ? <AiFillMinusCircle /> : <GiPlainCircle />}
        </button>
        <button 
          id="maximizeAppButton"
          onClick={() => maximizeApp()}>
          {active ? <BsArrowUpRightCircleFill /> : <GiPlainCircle />}
        </button>
      </div>
    </div>
  </React.Fragment>
  );
}

export default Frame;