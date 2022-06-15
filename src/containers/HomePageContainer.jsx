import React from 'react';

const HomePageContainer = () => {

  return (
    <div className="HomePageContainer">
      <div className="PrometheusHeaderBox">
        <p> Prometheus Server </p>
      </div>
      <div className="HomePageInputsBox">
          <div className="hostnameInputBox">
            <p>host name</p>
            <input id="hostnameInput" placeholder="ex.localhost/"/>
          </div>
          <div className="portnameInputBox">
            <p>port number</p>
            <input id="portInput" placeholder="#0000"/>
          </div>
      </div>
    </div>
  );

};

export default HomePageContainer;