/**
 * ************************************
 *
 * @module AlertComponent.jsx
 * @author team Buoy
 * @description React Component for rendering Prometheus Alerts
 *
 * ************************************
 */

import React from 'react';

const PromComponent = (props) => {
  return (
    <iframe
      width='97%'
      height='1150px'
      src={'http://localhost:9090/alerts'}
    />
  );
};

export default PromComponent;