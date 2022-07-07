/**
 * ************************************
 *
 * @module AlertComponent.jsx
 * @author team Buoy
 * @description React Component for rendering Grafana Dashboard
 *
 * ************************************
 */
import React from 'react';

const DashboardComponent = (props) => {
  return (
    <iframe
      width='97%'
      height='1150px'
      src={'http://localhost:3000'}
    />
  );
};

export default DashboardComponent;