import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { selectNamespaces, selectKubeObjects } from '../reducers/clustersSlice';

const Header = () => {

  const namespaces = useSelector(selectNamespaces);
  const clusters = useSelector(selectKubeObjects);
  
  const nullNsObjectCount = namespaces.length - 1 + namespaces[0].deployments.length + namespaces[0].services.length + namespaces[0].pods.length;
  const totalObjectCount = clusters.totalObjects;
  const nsObjectCount = totalObjectCount - nullNsObjectCount;

  return (
    <div className="clusterHeaderCx">
      <div className="clusterHeader">
        <h1 id="overview">Namespaces</h1>
        <table id="namespace-table">
          <tbody>
            <tr id = "table-counts">
              <td className="tooltip">
                {nullNsObjectCount}
                <span className="tooltiptext" id="leftTT">Unassigned objects</span>
              </td>
              <td className="tooltip" id="objectcount">
                <strong>{totalObjectCount}</strong>
                <span className="tooltiptext" id="centerTT">Total objects</span>
              </td>
              <td className="tooltip">
                {nsObjectCount}
                <span className="tooltiptext" id="rightTT">Objects assigned to namespace</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

}


export default Header;