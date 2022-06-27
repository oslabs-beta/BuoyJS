import React from 'react';

const Pod = (props) => {  

  const toggleDetailsOn = (event) => {
    const details = event.currentTarget.parentElement.lastChild;
    details.classList.add('active');
  }

  const toggleDetailsOff = (event) => {
    const details = event.currentTarget.lastChild;
    details.classList.remove('active');
  }

  return (
    <div onMouseLeave={ toggleDetailsOff }>
      <div className="objectCardName" onMouseOver={ toggleDetailsOn }>{props.name}</div>
      <div className="objectCardInfo">
        <ul>
            <li>
              <span className="objectCardInfoProp">Status: </span>
              <span className="objectCardInfoAttr">{ props.status }</span></li>
            <li>
              <span className="objectCardInfoProp">IP: </span> 
              <span className="objectCardInfoAttr">{ props.podIP }</span></li>
        </ul>
      </div>
    </div>
  );

}
/*
  <li>
    <span className="objectCardInfoProp">Name:</span> 
    <span className="objectCardInfoAttr">{ props.name}</span></li>
*/

export default Pod;