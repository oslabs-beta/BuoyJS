/**
 * ************************************
 *
 * @module Header.jsx
 * @author team Buoy
 * @description React Component for Clusters page top metrics overview
 *
 * ************************************
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selectNamespaces, selectNodes } from '../reducers/clustersSlice';

const Header = () => {

  const namespaces = useSelector(selectNamespaces);
  const nodes = useSelector(selectNodes);
  let podCount = 0;
  Object.keys(nodes).map(key => {
    podCount += nodes[key].length;
    return null;
  })

  return (
    <div className="clusterHeaderCx">
      <div className="clusterHeader">
        <h1 id="overview">Overview</h1>
        <table id="namespace-table">
          <tbody>
            <tr id = "table-counts">
              <td className="tooltip">
                {namespaces.length}
                <span className="tooltiptext" id="leftTT">Namespaces Count</span>
              </td>
              <td className="tooltip" id="objectcount">
                <strong>{Object.keys(nodes).length}</strong>
                <span className="tooltiptext" id="centerTT">Node Count</span>
              </td>
              <td className="tooltip">
                {podCount}
                <span className="tooltiptext" id="rightTT">Pod Count</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;