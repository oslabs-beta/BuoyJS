import React from 'react';

const Service = (props) => {  

  const toggleDetailsOn = (event) => {
    const details = event.currentTarget.parentElement.lastChild;
    details.classList.add('active');
  }

  const toggleDetailsOff = (event) => {
    const details = event.currentTarget.lastChild;
    details.classList.remove('active');
  }

  /*
   <div className="servicesCardInfoCx">
      <p className="objectCardExpandHeader">Services</p>
      {
        props.namespace.services.map( (service,idx) => {
          return(
            <div key={`${service.name}${idx}`} className="service-item">
            <span>{service.name}</span> <span>{ service.type }</span> <span>{service.clusterIP}</span>
            </div>
          )
        })
      }
    </div>
  */
  return (
    <div onMouseLeave={ toggleDetailsOff }>
      <div className="objectCardName" onMouseOver={ toggleDetailsOn }>{props.name}</div>
      <div className="objectCardInfo">
        <ul>
          <li>
            <span className="objectCardInfoProp">Type:</span>
            <span className="objectCardInfoAttr">{ props.type }</span>
          </li>
          <li>
            <span className="objectCardInfoProp">IP:</span>
            <span className="objectCardInfoAttr">{ props.clusterIP }</span>
          </li>
          <li>
            <span className="objectCardInfoProp">Ports:</span>
            <span className="objectCardInfoAttr">
              { props.ports.map( (portInfo) => {
                return (
                  `${portInfo.port}${portInfo.nodePort === undefined ? '' : ':'+ portInfo.nodePort}/${ portInfo.protocol}`
                );
              }).join(', ') }
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

}

/*
<li>
  <span className="objectCardInfoProp">Name:</span>
  <span className="objectCardInfoAttr">{ props.name}</span>
</li>
*/

export default Service;