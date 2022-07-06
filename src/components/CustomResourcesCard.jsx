import React, { useEffect } from 'react';
import { selectInputs } from '../reducers/inputSlice.js'
import { useSelector } from 'react-redux';
import CustomResourceListItem from './CustomResourceListItem.jsx';
// where data coming from may not be props .... subject to change

const CustomResourcesCard = props => {
  let list = [];
  for (let i = 0; i < props.labels.length; i++){
    list.push(<CustomResourceListItem key={'id' + i} label={props.labels[i]} metrics={props.metrics[i]}/>);
  }
  
  return (
    <div className="ClusResCardContainer">
      <div className="ResourceMetrics">
        <h3>Custom Resources</h3>
        <ul className="ResourcesList" id="CustomResourceList">
          { list }
        </ul>
      </div>
    </div>
  );
};

export default CustomResourcesCard;