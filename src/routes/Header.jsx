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
      <h1 id="overview">Namespace</h1>
      <table id="namespace-table">
        <tbody>
          <tr id = "table-counts">
            <td className="tooltip">
              {remainderCount}
              <span className="tooltiptext" id="leftTT">Objects assigned to namespace</span>
            </td>
            <td className="tooltip" id="objectcount">
              <strong>{objectCount}</strong>
              <span className="tooltiptext" id="centerTT">Total objects</span>
            </td>
            <td className="tooltip">
              {nullCount}
              <span className="tooltiptext" id="rightTT">Unassigned objects</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}


export default Header;