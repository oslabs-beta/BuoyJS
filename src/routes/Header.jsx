import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { selectNamespaces, selectKubeObjects } from '../reducers/clustersSlice';

const Header = () => {

  const namespaces = useSelector(selectNamespaces);
  const clusters = useSelector(selectKubeObjects);
  console.log('namespaces', namespaces);
  console.log('clusters', clusters);

  
  let objectCount = 0;
  namespaces.forEach(namespace => {
    objectCount += namespace.pods.length  ? namespace.pods.length : 0;
    objectCount += namespace.services.length  ? namespace.services.length : 0;
    objectCount += namespace.deployments.length  ? namespace.deployments.length : 0;
  })
  let nullCount = 0;
  nullCount += namespaces[0].pods.length  ? namespace.pods.length : 0;
  nullCount += namespaces[0].services.length  ? namespace.services.length : 0;
  nullCount += namespaces[0].deployments.length  ? namespace.deployments.length : 0;
  const remainderCount = objectCount - nullCount;
  
  
  console.log('obj count', objectCount);
  console.log('null count', nullCount);
  console.log('remainder count', remainderCount);
    

  return (
    <div className="AppHeader">
      <p>Namespaces Overview: </p>
      <table id="namespace-table">
        <tr id ="table-title">
          <th>Total objects</th>
          <th>Assigned to namespace</th>
          <th>Unassigned</th>
        </tr>
        <tbody>
          <tr id = "table-counts">
            <td>{objectCount}</td>
            <td>{remainderCount}</td>
            <td>{nullCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}


export default Header;