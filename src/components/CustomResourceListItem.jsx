import React from 'react';

// where data coming from may not be props .... subject to change

const CustomResourceListItem = props => {
  return (
    <li list-style='none'> {props.label} <span>{props.metric}</span></li>
  );
};

export default CustomResourceListItem;