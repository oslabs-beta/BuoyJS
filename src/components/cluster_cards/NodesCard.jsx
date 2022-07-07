/**
 * ************************************
 *
 * @module NodesCard.jsx
 * @author team Buoy
 * @description React Component for rendering Node components in Clusters card
 *
 * ************************************
 */

import React, { useState } from 'react';
import { SiHashnode } from 'react-icons/si';
import Pod from './Pod.jsx';

const NodesCard = (props) => {

  const [ active, setActive ] = useState(false);

  const onMaximizeButtonClick = (event) => {

    const cardContainer = event.currentTarget.parentElement.parentElement.parentElement;
    const dimmer = document.querySelector('.nodeDimmer');

    cardContainer.classList.toggle('active');
    dimmer.classList.toggle('active');

  };

  const NodeFrontBack = () => {
    return (
      <React.Fragment>
        <div className="nodeCardBox">
          <div className="nodeIcon">
            <SiHashnode size="3em"/>
          </div>
          <ul>
            <li><span className="nodeFrontName">{props.name}</span></li>
            <li><span className="nodeFrontPodCount">{props.pods.length}</span></li>
          </ul>
        </div>
        <div className="nodeCardBackBox">
          <div className="nodeCardBackButtonCx"><button className="nodeCardBackMaximize" 
            onClick={ (event) => {
              (active) ? setActive(false) : setActive(true);
              onMaximizeButtonClick(event);
            }}>
            <i className="fa-solid fa-window-maximize"></i></button>
          </div>
          <div className="nodeBackInfoCx">
            <ul>
              <li><span className="nodeBackAttribute">Name: </span><span className="nodeBackValue">{props.name}</span></li>
              <li><span className="nodeBackAttribute">Pods: </span><span className="nodeBackValue">{props.pods.length}</span></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const NodeExpanded = (props) => {
    return (
      <div className="nodeCardExpandedBox">
        <div className="nodeCardBackButtonCx">
          <button className="nodeCardBackMaximize" 
            onClick={ (event) => {
              (active) ? setActive(false) : setActive(true);
              onMaximizeButtonClick(event);
            }}>
            <i className="fa-solid fa-window-maximize"></i></button>
        </div>

        <div className="objectCardExpandHeader">
          Pods
        </div>

        <div className="ObjectCardContentCx">
        { props.pods.map ( pod => 
          <Pod
            key={pod.name + pod.nodeName}
            name={pod.name}
            status={pod.status}
            podIP={pod.podIP}
          />
        )}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="nodeDimmer"></div>
      <div className="nodeCardBoxBorder">
        { active ? <NodeExpanded pods={ props.pods }/> : <NodeFrontBack />}
      </div>
    </React.Fragment>
  );
};

export default NodesCard;