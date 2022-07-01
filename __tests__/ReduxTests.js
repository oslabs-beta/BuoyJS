import subject, { addNamespaces, addDeployments, addPods, addServices } from '../src/reducers/clustersSlice.js';

describe('clustersSlice', () => {
  const state = {
    namespaces: [
      {
        creationTime: undefined,
        name: null,
        status: undefined,
        deployments: [],
        pods: [],
        services: [],
      }
    ],
    deployments: [],
    pods: [],
    services: [],
    totalObjects: 0
  }

  describe('default state', () => {
    it ('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognizable action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'lalal' };
      expect(subject(state, action)).toBe(state);
    });
  });

  const namespaces1 = [{
    creationTime: '2022-06-27T17:08:47.153Z',
    name: 'namespace1',
    status: 'active',
    deployments: [],
    pods: [],
    services: [],
  }];

  describe('addNamespaces', () => {

    it ('adds a namespace', () => {
      const { namespaces } = subject(state, addNamespaces(namespaces1));
      expect(namespaces[1]).toEqual(namespaces1[0]);
    });
  });

  const prevState = {
    namespaces: [
      {
        creationTime: undefined,
        name: null,
        status: undefined,
        deployments: [],
        pods: [],
        services: []
      },
      {
        creationTime: '2022-06-27T17:08:47.153Z',
        name: 'namespace1',
        status: 'active',
        deployments: [],
        pods: [],
        services: []
      }
    ],
    deployments: [],
    pods: [],
    services: [],
    totalObjects: 0
  }

  const depl1 = [{name: 'depl1', namespace: 'namespace1'}];
  const pod1 = [{name: 'pod1', namespace: 'namespace1'}];
  const service1 = [{name: 'service1', namespace: 'namespace1'}];

  describe('addDeployments', () => {
    
    it ('adds a deployment with correct namespace', () => {
      const { namespaces } = (subject(prevState, addDeployments(depl1)));
      expect(namespaces[1].deployments[0]).toEqual(depl1[0]);
    })

    it ('does not add a deployment with incorrect namespace', () => {
      const { namespaces } = (subject(prevState, addDeployments(depl1)));
      expect(namespaces[0].deployments.length).toBe(0);
    })  
  })

  describe('addPods', () => {
    it ('adds a pod with correct namespace', () => {
      const { namespaces } = (subject(prevState, addPods(pod1)));
      expect(namespaces[1].pods[0]).toEqual(pod1[0]);
    })
  
    it ('does not add a pod with incorrect namespace', () => {
      const { namespaces } = (subject(prevState, addPods(pod1)));
      expect(namespaces[0].deployments.length).toBe(0);
    })
  })

  describe('addServices', () => {
    it ('adds a service with correct namespace', () => {
      const { namespaces } = (subject(prevState, addServices(service1)));
      expect(namespaces[1].services[0]).toEqual(service1[0]);
    })
  
    it ('does not add a service with incorrect namespace', () => {
      const { namespaces } = (subject(prevState, addServices(service1)));
      expect(namespaces[0].services.length).toBe(0);
    })
  })
})