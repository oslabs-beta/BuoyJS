import React, { useEffect } from 'react';
import { selectInputs } from '../reducers/inputSlice.js'
import { useSelector } from 'react-redux';
import CustomResourceListItem from './CustomResourceListItem.jsx';
import { ipcRenderer } from 'electron';
// where data coming from may not be props .... subject to change

const CustomResourcesCard = props => {
  const { queryLabel, customMetrics } = useSelector(selectInputs)
  //console.log(queryLabel, customMetrics)
  const list = []
  
  for (let i = 0; i < queryLabel.length; i++){
    list.push(<CustomResourceListItem label={queryLabel[i]} metrics={customMetrics[i]}/>);
  };

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