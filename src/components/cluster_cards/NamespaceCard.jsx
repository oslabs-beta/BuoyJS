import React from 'react';

const NamespaceCard = (props) => {

  const onMaximizeButtonClick = (event) => {

    const cardContainer = event.currentTarget.parentElement.parentElement;    
    console.log(cardContainer);
    //cardContainer.style.width = "45rem";
    //cardContainer.style.zIndex = "1000";
  }

  return (
    <div className="namespaceCardBox">
      <div className="nsCardFrontBox">
        <div className="svgContainer">
          <svg xmlns="http://www.w3.org/2000/svg" width="288" height="288" viewBox="0 0 25 25" preserveAspectRatio='xMidYMin'><path fill="#2d5d75" d="M14 12a1.993 1.993 0 0 0-1.008.305L10.78 10.15a3.439 3.439 0 0 0 .74-1.993L13.09 8a1.49 1.49 0 1 0-.089-.768l-1.591.128a3.512 3.512 0 0 0-1.978-2.521L9.74 4H10a2 2 0 1 0-1.01-.265l-.27.855a3.31 3.31 0 0 0-.754-.084c-.83 0-1.59.296-2.181.789L2.791 2.291a1.5 1.5 0 1 0-1.291.71c.281-.001.544-.079.767-.214L5.26 5.791a3.446 3.446 0 0 0-.76 2.168v.203l-.66.11a2 2 0 1 0 .161.786L4 8.999l.63-.097a3.522 3.522 0 0 0 1.466 1.992l-.556 1.188a1.947 1.947 0 0 0-.539-.08h-.017a2 2 0 1 0 1.231.423l.566-1.153c.364.146.787.231 1.229.231.847 0 1.621-.311 2.216-.824l2.176 2.124a2 2 0 1 0 1.6-.8zm-9 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-4.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" className="namespaceSVG"></path></svg>
        </div>
        <span className="nsFrontName">{props.namespace.name}</span>
        <span className="nsFrontStatus">{props.namespace.status}</span>
      </div>
      <div className="nsCardBackBox">
        <div className="nsCardBackButtonCx"><button className="nsCardBackMaximize" onClick={ onMaximizeButtonClick }><i className="fa-solid fa-window-maximize"></i></button></div>
        <ul>
          <li><span className="nsBackAttribute">Name: </span><span className="nsBackValue">{props.namespace.name}</span></li>
          <li><span className="nsBackAttribute">Status: </span><span className="nsBackValue">{props.namespace.status}</span></li>
          <li><span className="nsBackAttribute">Deployments: </span><span className="nsBackValue">{props.namespace.deployments.length}</span></li>
          <li><span className="nsBackAttribute">Pods: </span><span className="nsBackValue">{props.namespace.pods.length}</span></li>
          <li><span className="nsBackAttribute">Services: </span><span className="nsBackValue">{props.namespace.services.length}</span></li>
        </ul>
      </div>
    </div>);

}

export default NamespaceCard;