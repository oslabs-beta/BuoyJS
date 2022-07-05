import { ipcRenderer } from 'electron';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortNumber, getQueryLabel } from '../reducers/inputSlice';
const CustomQueryInput = props => {

// query itself
// enter query type
// enter query label
// 1 enter for all 3 inputs

  let customPort;
  const portInput = e => {
    customPort = e.target.value;
    return (Number(customPort) === NaN ? console.error("Please enter a valid number") : Number(customPort));
  }

  let customQueryInput;
    const queryInput = e => {
      customQueryInput = e.target.value;
      return customQueryInput;
    };

  let customQueryLabel;
    const queryInputLabel = e => {
      customQueryLabel = e.target.value;
      return customQueryLabel;
    };

  let customQueryType;
    const queryType = e => {
      customQueryType = e.target.value;
      return customQueryType
    };

    const dispatch = useDispatch()

  return (

    <div className="CustomQueryInput">

      <h4>Enter TCP Port Number:</h4>
      <input id="customPort" placeholder="Enter Port Number" onChange={ portInput }/>
      <button id="customPortButton" onClick={() => {
        ipcRenderer.send('add:prom-target', customPort);
        dispatch(getPortNumber(customPort));  
        document.querySelector('#customPort').placeholder = `${customPort}`
        document.querySelector('#customPort').value = '';
        }} > Enter </button>

      <h4>Enter Query:</h4>
      <input id="customQuery" placeholder="Enter custom Query String" onChange={ queryInput } required/>

      <h4>Enter Query Type:</h4>
      <select id="customQueryType" onChange={ queryType }>  //revisit
        <option value="query"> query </option>
        <option value="query_range"> query_range </option>
      </select>

      <h4>Enter Label:</h4>
      <input id="customQueryLabel" placeholder="Name Your Query" onChange={ queryInputLabel } required/>

      <button id="customQueryButton" onClick={() => {
        ipcRenderer.send('add:custom-query', customQueryType, customQueryInput)
        dispatch(getQueryLabel(customQueryLabel))
      }} > Enter </button>

    </div>

  );
};

export default CustomQueryInput;