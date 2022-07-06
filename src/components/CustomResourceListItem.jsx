import React, { useEffect } from 'react';

// where data coming from may not be props .... subject to change

const CustomResourceListItem = props => {
  return (
    <li list-style='none'> {props.label}:  <span>{(props.metrics) ? props.metrics : 0}</span></li>
  );
};

export default CustomResourceListItem;