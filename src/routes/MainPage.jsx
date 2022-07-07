import React, { useEffect, useState } from 'react';

// import containers
import ClustersContainer from '../containers/ClustersContainer.jsx';
import ResourcesContainer from '../containers/ResourcesContainer.jsx';
import PromContainer from '../containers/PromContainer.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';

const MainPage = () => {

  const [ active, setActive ] = useState({ currentTab: "clustersTab", prevTab: "clustersTab"});

  function toggleMenuOn() {
    const menu = document.querySelector('.menuTabs');
    menu.classList.add('active');
  };

  function toggleMenuOff() {
    const menu = document.querySelector('.menuTabs');
    menu.classList.remove('active');
  };

  function toggleMenuNameOn(event) {
    const nameMapping = {
      clustersTab: "Clusters",
      resourcesTab: "Resources",
      controlPlaneTab: "Dashboard",
      promTab: "Prometheus"
    }
    const tab = document.getElementById(event.currentTarget.id);
    const spanText = document.createElement('span');
    spanText.innerHTML = nameMapping[event.currentTarget.id];
    tab.appendChild(spanText);
  };

  function toggleMenuNameOff(event) {
    const tab = document.getElementById(event.currentTarget.id);
    tab.removeChild(tab.lastChild);
  };

  function onTabClick() {
    const prevTab = document.getElementById(active.prevTab);
    const currentTab = document.getElementById(active.currentTab);

    prevTab.classList.toggle('active');
    currentTab.classList.toggle('active');
    
  };

  useEffect( () => { onTabClick() }, [ active ]);

  return (
    <div className="mainPage">
      <div className="contentContainer">
        <div className="toggleMenu" onMouseEnter={ toggleMenuOn }>
          <span>&#183;</span>
          <span>&#183;</span>
        </div>
        <div className="menuTabs" onMouseLeave={ toggleMenuOff }>
          <button
            className="menuTab active"
            id="clustersTab" 
            active={ `${active.currentTab === "clustersTab"}` } 
            onClick={ () => setActive({ currentTab: "clustersTab", prevTab: active.currentTab}) }
            onMouseEnter={ toggleMenuNameOn }
            onMouseLeave={ toggleMenuNameOff }
          > 
            <i className="fa-solid fa-circle-nodes fa-2x"></i>
          </button>
          <button className="menuTab"
            id="resourcesTab" 
            active={ `${active.currentTab === "resourcesTab"}` } 
            onClick={ () => setActive({ currentTab: "resourcesTab", prevTab: active.currentTab}) }
            onMouseEnter={ toggleMenuNameOn }
            onMouseLeave={ toggleMenuNameOff }
          > 
            <i className="fa-solid fa-chart-line fa-2x"></i>
          </button>
          <button 
            className="menuTab"
            id="dashboardTab" 
            active={ `${active.currentTab === "dashboardTab"}` } 
            onClick={ () => setActive({ currentTab: "dashboardTab", prevTab: active.currentTab} )}
            onMouseEnter={ toggleMenuNameOn }
            onMouseLeave={ toggleMenuNameOff }
          >
            <i className="fa-solid fa-paper-plane fa-2x"></i>
          </button>
          <button
            className="menuTab"
            id="promTab" 
            active={`${active.currentTab === "promTab"}`} 
            onClick={ () => setActive({ currentTab: "promTab", prevTab: active.currentTab}) }
            onMouseEnter={ toggleMenuNameOn }
            onMouseLeave={ toggleMenuNameOff }  
          > 
            <i className="fa-solid fa-fire fa-2x"></i>
          </button>
        </div>
        <React.Fragment>
          { active.currentTab === 'clustersTab' &&  <ClustersContainer /> }
          { active.currentTab === 'resourcesTab' && <ResourcesContainer /> }
          { active.currentTab === 'dashboardTab' && <DashboardContainer /> }
          { active.currentTab === 'promTab' && <PromContainer /> } 
          { }
        </React.Fragment>
      </div>
    </div>
  );

};

export default MainPage;