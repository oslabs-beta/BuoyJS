const k8s = require('@kubernetes/client-node');
const { ipcMain } = require('electron');
const { exec, spawn } = require('child_process');

/*
Class for kubernetes client for retrieving similar information to kubectl
*/
class KubeClient {


  /**
   * Initialize our connection to the Kubernetes API
   * @param { BrowserWindow } window 
   */
  constructor(window) {
    
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    this.k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
    this.k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);
    this.window = window;

    this.namespaces = [];
    this.deployments = [];
    this.pods = [];
    this.services = [];
    this.apiResources;

    this.initializeNamespacesData = this.initializeNamespacesData.bind(this);
    this.initializeDeploymentsData = this.initializeDeploymentsData.bind(this);
    this.initializePodsData = this.initializePodsData.bind(this);
    this.initializeServicesData = this.initializeServicesData.bind(this);

    this.initializeNamespacesData();
    this.initializeDeploymentsData();
    this.initializePodsData();
    this.initializeServicesData();
    this.initializeApiResourcesData();
  }

  initializeNamespacesData() {
    // get all local namespace
    const namespacePromise = this.k8sCoreApi.listNamespace()
    .then ( res => res.body )
    .then ( data => { 
      const items = data.items;
      items.map ( namespace => {
        this.namespaces.push({
          creationTime: namespace.metadata.creationTimestamp.getTime(),
          name: namespace.metadata.name,
          status: namespace.status.phase,
        });
      });

      this.namespaces.sort( (a,b) => a.name - b.name);

      ipcMain.on('load:namespaces', () => {
        this.window.webContents.send('get:namespaces', this.namespaces);
      });
    });
  }

  initializeDeploymentsData() {
    // get all local deployments
    const deploymentPromise = this.k8sAppsApi.listDeploymentForAllNamespaces()
    .then(res => res.body)
    .then(data => {
      const items = data.items;
      items.map( deployment => {
        this.deployments.push({
          name: deployment.metadata.name,
          namespace: deployment.metadata.namespace,
          replicas: deployment.spec.replicas,
        })
      });

      this.deployments.sort( (a,b) => a.namespace - b.namespace);

      ipcMain.on('load:deployments', () => {
        this.window.webContents.send('get:deployments', this.deployments);
      });
    });
  }

  initializePodsData() {
    // get all local pods
    const podPromise = this.k8sCoreApi.listPodForAllNamespaces()
    .then( res => res.body)
    .then( data => {
      const items = data.items;
      items.map(pod => {
        this.pods.push({
          name: pod.metadata.name,
          namespace: pod.metadata.namespace,
          status: pod.status.phase,
          podIP: pod.status.podIP,
        })
      });

      this.pods.sort( (a,b) => a.namespace - b.namespace);

      ipcMain.on('load:pods', () => {
        this.window.webContents.send('get:pods', this.pods);
      });
    });
  }
  
  initializeServicesData() {
    // get all local services
    const servicePromise = this.k8sCoreApi.listServiceForAllNamespaces()
      .then( res => res.body)
      .then ( data => {
        const items = data.items;
        items.map(service => {
          
          this.services.push({
            name: service.metadata.name,
            namespace: service.metadata.namespace,
            clusterIP: service.spec.clusterIP,
            ports: service.spec.ports,
            type: service.spec.type,
          });
        });

        this.pods.sort( (a,b) => a.namespace - b.namespace);
        
        ipcMain.on('load:services', () => {
          this.window.webContents.send('get:services', this.services);
        });
      });

  }

  async initializeApiResourcesData() {
    // get output of kubectl api-resources for all resource in current cluster
    
    const command = 'kubectl api-resources';

    ipcMain.on('load:apiResources', () => {
      exec(command, (err, stdout, stderr) => {
        this.apiResources = { err, stdout, stderr };
        this.window.webContents.send('get:apiResources', this.apiResources);
      });
    });
    
  }

}

module.exports = KubeClient;