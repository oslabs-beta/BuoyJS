const k8s = require('@kubernetes/client-node');
const { ipcMain } = require('electron');
const { exec } = require('child_process');
const { stdout } = require('process');

/*
Class for kubernetes client for retrieving similar information to kubectl
*/
class KubeClient {


  /**
   * Initialize our connection to the Kubernetes API
   * @param { BrowserWindow } window 
   */
  constructor(window) {

    console.log(window);
    
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

    this.sendObjectsData = this.sendObjectsData.bind(this);
    this.initializeObjectsData();
  }

  initializeObjectsData() {

    // get all local namespace
    const namespacePromise = this.k8sCoreApi.listNamespace()
    .then ( res => res.body )
    .then ( data => { 
      const items = data.items;
      items.map ( namespace => {
        this.namespaces.push({
          creationTime: namespace.metadata.creationTimestamp,
          name: namespace.metadata.name,
          status: namespace.status.phase,
        });
      });
    });

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
      })
    });
    
    // get all local pods
    const podPromise = this.k8sCoreApi.listPodForAllNamespaces()
    .then( res => res.body)
    .then( data => {
      const items = data.items;
      items.map(pod => {
        this.pods.push({
          name: pod.metadata.name,
          status: pod.status.phase,
          podIPs: pod.status.podIPs,
        })
      });
    });

    // get all local services
    const servicePromise = this.k8sCoreApi.listServiceForAllNamespaces()
      .then( res => res.body)
      .then ( data => {
        const items = data.items;
        items.map(service => {
          
          this.services.push({
            name: service.metadata.name,
            namespace: service.metadata.namespace,
            clusterIPs: service.spec.clusterIP,
            ports: service.spec.ports,
            type: service.spec.type,
          });
        });
      });
    
    // get output of kubectl api-resources for all resource in current cluster
    const command = 'kubectl api-resources';

    exec(command, (err, stdout, stderr) => {
      this.apiResources = { err, stdout, stderr };
    });
    // wait for all to be received prior to emitting message
    Promise.all([namespacePromise, deploymentPromise, podPromise, servicePromise])
      .then( () => {
        ipcMain.on('load:kube-objects', this.sendObjectsData);
        
      });
  }

  sendObjectsData() {
    this.window.webContents.send('get:namespaces', this.namespace);
    this.window.webContents.send('get:deployments', this.deployments);
    this.window.webContents.send('get:pods', this.pods);
    this.window.webContents.send('get:services', this.services);
    this.window.webContents.send('get:apiResources', this.apiResources);
  }
}

module.exports = KubeClient;