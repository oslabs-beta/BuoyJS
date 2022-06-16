const k8s = require('@kubernetes/client-node');
const electron = require('electron');

class KubeClient {

  constructor(window) {

    console.log(window);
    
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    this.k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
    this.k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);
    this.window = window;

    this.deployments = [];
    this.pods = [];
    this.services = [];

    this.initializeObjectsData = this.initializeObjectsData.bind(this);
    this.sendObjectsData = this.sendObjectsData.bind(this);

    this.initializeObjectsData();
    this.sendObjectsData();
  }

  initializeObjectsData() {
    this.k8sAppsApi.listDeploymentForAllNamespaces()
    .then(res => res.body)
    .then(data => {
      const items = data.items;
      items.map( deployment => {
        this.deployments.push({
          name: deployment.metadata.name,
          namespace: deployment.metadata.namespace,
          replicas: deployment.metadata.replicas,
        })
      });
    });

    this.k8sCoreApi.listPodForAllNamespaces()
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

    this.k8sCoreApi.listServiceForAllNamespaces()
      .then( res => res.body)
      .then ( data => {
        const items = data.items;
        items.map(service => {
          
          this.services.push({
            name: service.metadata.name,
            namespace: service.metadata.namespace,
            clusterIPs: service.spec.clusterIP,
            ports: service.spec.ports
          });
        });
      });
  }

  sendObjectsData() {
    console.log("Window: ", this.window);
    
    this.window.webContents.send('get:deployments', this.deployments);
    console.log(this.deployments);
    this.window.webContents.send('get:pods', this.pods);
    this.window.webContents.send('get:services', this.services);
    
  }

}

module.exports = KubeClient;