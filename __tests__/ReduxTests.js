/**
 * ************************************
 *
 * @module ReduxTests.js
 * @author team Buoy
 * @description Redux Store, Slices, Actions testing
 *
 * ************************************
 */

import subject, { addNamespaces, addDeployments, addPods, addServices } from '../src/reducers/clustersSlice.js';
import network, { getCpuUsage, getMemUsage, getTotalCpu, getTotalMem, setNodeCpuUsage } from '../src/reducers/networkSlice.js';
import input, { getPortNumber, getQuery, getQueryType, getQueryLabel } from '../src/reducers/inputSlice.js';

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
    nodes: {},
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
});

describe('networkSlice', () => {
  const defaultState = {
    cpuUsage: 0,
    memUsage: 0,
    totalCpu: 0,
    totalMem: 0,
    nodeCpuUsage: [],
  }

  describe('default state', () => {
    it ('should return a default state when given an undefined input', () => {
      expect(network(undefined, { type: undefined })).toEqual(defaultState);
    });
  });

  describe('unrecognizable action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'lalal' };
      expect(network(defaultState, action)).toBe(defaultState);
    });
  });

  describe('getCpuUsage', () => {
    it('returns cpuUsage from state', () => {
      const { cpuUsage } = network(defaultState, getCpuUsage(100));
      expect(cpuUsage).toBe(100);
    });
    it('does not alter initial state', () => {
      expect(defaultState.cpuUsage).toBe(0);
    });
  });

  describe('getMemUsage', () => {
    it('returns memUsage from state', () => {
      const { memUsage } = network(defaultState, getMemUsage(150));
      expect(memUsage).toBe(150);
    });
    it('does not alter intial state', () => {
      expect(defaultState.memUsage).toBe(0);
    });
  });

  describe('getTotalCpu', () => {
    it('returns totalCpu from state', () => {
      const { totalCpu } = network(defaultState, getTotalCpu(200));
      expect(totalCpu).toBe(200);
    });
    it('does not alter initial state', () => {
      expect(defaultState.totalCpu).toBe(0);
    });
  });

  describe('getTotalMem', () => {
    it('returns totalMem from state', () => {
      const { totalMem } = network(defaultState, getTotalMem(250));
      expect(totalMem).toBe(250);
    });
    it('does not alter initial state', () => {
      expect(defaultState.totalMem).toBe(0);
    });
  });

  describe('setNodeCpuUsage', () => {
    const nodeData = [{nodeName: 'node1', cpuUsage: 32}, {nodeName: 'node2', cpuUsage: 34}];
    it('adds node data if nodeCpuUsage array is empty', () => {
      const { nodeCpuUsage } = network(defaultState, setNodeCpuUsage(nodeData));
      expect(nodeCpuUsage).toBeInstanceOf(Array);
      expect(nodeCpuUsage).toHaveLength(2);
      expect(nodeCpuUsage[0]).toHaveProperty('nodeName');
      expect(nodeCpuUsage[0]).toHaveProperty('cpuUsage');
      expect(nodeCpuUsage[1]).toHaveProperty('nodeName');
      expect(nodeCpuUsage[1]).toHaveProperty('cpuUsage');
      expect(nodeCpuUsage[0].nodeName).toBe('node1');
      expect(nodeCpuUsage[0].cpuUsage).toBeInstanceOf(Array);
      expect(nodeCpuUsage[0].cpuUsage[0]).toBe(32);
      expect(nodeCpuUsage[1].nodeName).toBe('node2');
      expect(nodeCpuUsage[1].cpuUsage).toBeInstanceOf(Array);
      expect(nodeCpuUsage[1].cpuUsage[0]).toBe(34);      
    });
    it('does not alter initial state', () => {
      expect(defaultState.nodeCpuUsage).toBeInstanceOf(Array);
      expect(defaultState.nodeCpuUsage).toHaveLength(0);
    });
    it('does not add node data if nodeCpuUsage array is not empty', () => {
      const newState = {
        cpuUsage: 0,
        memUsage: 0,
        totalCpu: 0,
        totalMem: 0,
        nodeCpuUsage: [{nodeName: 'nodeOne', cpuUsage: [45]}],
      }
      const { nodeCpuUsage } = network(newState, setNodeCpuUsage(nodeData));
      expect(nodeCpuUsage).toBeInstanceOf(Array);
      expect(nodeCpuUsage).toHaveLength(1);
      expect(nodeCpuUsage[0]).toHaveProperty('nodeName');
      expect(nodeCpuUsage[0]).toHaveProperty('cpuUsage');
      expect(nodeCpuUsage[0].nodeName).toBe('nodeOne');
      expect(nodeCpuUsage[0].cpuUsage).toBeInstanceOf(Array);
      expect(nodeCpuUsage[0].cpuUsage[0]).toBe(45);
    });
  })
});

describe('inputSlice', () => {
  const defaultState = {
    portNumber: 8080,
    query: "",
    queryType: "query",
    queryLabel: "",
  }

  describe('default state', () => {
    it ('should return a default state when given an undefined input', () => {
      expect(input(undefined, { type: undefined })).toEqual(defaultState);
    });
  });

  describe('unrecognizable action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'lalal' };
      expect(input(defaultState, action)).toBe(defaultState);
    });
  });

  describe('getPortNumber', () => {
    it('should reassign port number', () => {
      const { portNumber } = input(defaultState, getPortNumber(3000));
      expect(portNumber).toBe(3000);
    });
    it('does not alter initial state', () => {
      expect(defaultState.portNumber).toBe(8080)
    });
  });

  describe('getQuery', () => {
    it('should reassign query string', () => {
      const { query } = input(defaultState, getQuery('new query'));
      expect(query).toBe('new query');
    });
    it('does not alter initial state', () => {
      expect(defaultState.query).toBe('');
    });
  });

  describe('getQueryType', () => {
    it('should reassign query type', () => {
      const { queryType } = input(defaultState, getQueryType('other'));
      expect(queryType).toBe('other');
    });
    it('does not alter initial state', () => {
      expect(defaultState.queryType).toBe('query');
    });
  });

  describe('getQueryLabel', () => {
    it('should reassign query label', () => {
      const { queryLabel } = input(defaultState, getQueryLabel('label'));
      expect(queryLabel).toBe('label');
    });
    it('does not alter initial state', () => {
      expect(defaultState.queryLabel).toBe('');
    })
  })
});