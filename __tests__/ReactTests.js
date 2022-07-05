import React from 'React';
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

import NamespaceCard from '../src/components/cluster_cards/NamespaceCard';
import DeploymentsCard from '../src/components/cluster_cards/DeploymentsCard';
import Deployment from '../src/components/cluster_cards/Deployment';
import PodsCard from '../src/components/cluster_cards/PodsCard';
import Pod from '../src/components/cluster_cards/Pod'
import ServicesCard from '../src/components/cluster_cards/ServicesCard';
import Service from '../src/components/cluster_cards/Service';

describe('REACT Unit testing', () => {

   describe('NamespaceCard', () => {
    let nsCard;

    const props = {
      key: 'namespace1',
      namespace:
        {
          creationTime: '2022-06-27T17:08:47.153Z',
          name: 'namespace1',
          status: 'active',
          deployments: [{name: 'depl1', namespace: 'namespace1', replicas: 1}],
          pods: [{name: 'pod1', namespace: 'namespace1'}],
          services: [{name: 'service1', namespace: 'namespace1', type: 'cluster', clusterIP: '0.0.2', ports: [{ port: 3000 }]}]
        }
    }

    beforeEach(() => {
      nsCard = render(<NamespaceCard {...props}/>)
    })

    it('Renders NsFrontBack on load', () => {
      expect(nsCard.getByTestId('nsList')).toBeInTheDocument();
      expect(nsCard.getAllByRole('listitem').length).toBe(5);
      })

    it('Renders NsFrontBack with passed in props', () => {
      expect(nsCard.getAllByText(props.namespace.name)[0]).toBeInTheDocument();
      expect(nsCard.getAllByText(props.namespace.name)).toHaveLength(2);
      expect(nsCard.getAllByText(props.namespace.status)[0]).toBeInTheDocument();
      expect(nsCard.getAllByText(props.namespace.status)).toHaveLength(2);
      //length of deployments is 1, which is also length of pods & services so the following array comes back with three elements.
      expect(nsCard.getAllByText(props.namespace.deployments.length)).toHaveLength(3);
    })

    it('Renders 1 button initially', () => {
      expect(nsCard.getAllByRole('button')).toHaveLength(1);
    })  
  });

  describe('DeploymentsCard', () => {
    let deplCard;

    const props = {
      key: 'namespace1',
      namespace:
        {
          creationTime: '2022-06-27T17:08:47.153Z',
          name: 'namespace1',
          status: 'active',
          deployments: [{name: 'depl1', namespace: 'namespace1', replicas: 10}],
          pods: [{name: 'pod1', namespace: 'namespace1'}],
          services: [{name: 'service1', namespace: 'namespace1', type: 'cluster', clusterIP: '0.0.2', ports: [{ port: 3000 }]}]
        }
    }

    beforeEach(() => {
      deplCard = render(<DeploymentsCard {...props} />)
    });

    it('Renders a deployment card for each depl in namespace', () => {
      expect(deplCard.getByText(props.namespace.deployments[0].name)).toBeInTheDocument();
      expect(deplCard.getByText(props.namespace.deployments[0].replicas)).toBeInTheDocument();
    })
  })

  describe('Deployment', () => {
    let depl;

    const props = {
      name: 'depl1',
      replicas: 10
    }

    beforeEach(() => {
      depl = render(<Deployment {...props} />)
    });

    it('Renders name & replicas', () => {
      expect(depl.getByText(props.name)).toBeInTheDocument();
      expect(depl.getByText(props.replicas)).toBeInTheDocument();
    })
  })

  describe('PodsCard', () => {
    let podsCard;

    const props = {
      key: 'namespace1',
      namespace:
        {
          creationTime: '2022-06-27T17:08:47.153Z',
          name: 'namespace1',
          status: 'active',
          deployments: [{name: 'depl1', namespace: 'namespace1', replicas: 10}],
          pods: [{name: 'pod1', namespace: 'namespace1', status: 'Running', podIP: '0.1.2.3'}],
          services: [{name: 'service1', namespace: 'namespace1', type: 'cluster', clusterIP: '0.0.2', ports: [{ port: 3000 }]}]
        }
    }

    beforeEach(() => {
      podsCard = render(<PodsCard {...props} />)
    });

    it('Renders a pods card for each pod in namespace', () => {
      expect(podsCard.getByText(props.namespace.pods[0].name)).toBeInTheDocument();
      expect(podsCard.getByText(props.namespace.pods[0].status)).toBeInTheDocument();
      expect(podsCard.getByText(props.namespace.pods[0].podIP)).toBeInTheDocument();
    })
  })

  describe('Pod', () => {
    let pod;

    const props = {
      name: 'pod1',
      status: 'Running',
      podIP: '0.1.2.3'
    }

    beforeEach(() => {
      pod = render(<Pod {...props} />)
    });

    it('Renders name, status & podIP', () => {
      expect(pod.getByText(props.name)).toBeInTheDocument();
      expect(pod.getByText(props.status)).toBeInTheDocument();
      expect(pod.getByText(props.podIP)).toBeInTheDocument();
    })
  })

  describe('ServicesCard', () => {
    let servicesCard;

    const props = {
      key: 'namespace1',
      namespace:
        {
          creationTime: '2022-06-27T17:08:47.153Z',
          name: 'namespace1',
          status: 'active',
          deployments: [{name: 'depl1', namespace: 'namespace1', replicas: 10}],
          pods: [{name: 'pod1', namespace: 'namespace1', status: 'Running', podIP: '0.1.2.3'}],
          services: [{name: 'service1', namespace: 'namespace1', type: 'cluster', clusterIP: '0.0.2', ports: [{ port: 3000, protocol: 3030 }]}]
        }
    }

    beforeEach(() => {
      servicesCard = render(<ServicesCard {...props} />)
    });

    it('Renders a services card for each service in namespace', () => {
      expect(servicesCard.getByText(props.namespace.services[0].name)).toBeInTheDocument();
      expect(servicesCard.getByText(props.namespace.services[0].type)).toBeInTheDocument();
      expect(servicesCard.getByText(props.namespace.services[0].clusterIP)).toBeInTheDocument();
      expect(servicesCard.getByText(props.namespace.services[0].ports[0].port, {exact: false})).toBeInTheDocument();
      expect(servicesCard.getByText(props.namespace.services[0].ports[0].protocol, {exact: false})).toBeInTheDocument();
    })
  })

  describe('Service', () => {
    let service;

    const props = {
      name: 'service1',
      type: 'cluster', 
      clusterIP: '0.0.2', 
      ports: [{ port: 3000, protocol: 3030 }]
    }

    beforeEach(() => {
      service = render(<Service {...props} />)
    });

    it('Renders name, type, clusterIP port info & protocol', () => {
      expect(service.getByText(props.name)).toBeInTheDocument();
      expect(service.getByText(props.type)).toBeInTheDocument();
      expect(service.getByText(props.clusterIP)).toBeInTheDocument();
      expect(service.getByText(props.ports[0].port, {exact: false})).toBeInTheDocument();
      expect(service.getByText(props.ports[0].protocol, {exact: false})).toBeInTheDocument();
    })

    it('Exposes nodePort when applicable', () => {
      const portProps = {
        ports: [{ port: 3000, nodePort: 8080, protocol: 3030}]
      }

      const nodePortService = render(<Service {...portProps} />);

      expect(nodePortService.getByText(portProps.ports[0].nodePort, {exact: false})).toBeInTheDocument();
    })
  })
});

describe('REACT Integration Tests', () => {
   
  describe('NamespaceCard', () => {
    let nsCard;
    
    const props = {
      key: 'namespace1',
      namespace:
        {
          creationTime: '2022-06-27T17:08:47.153Z',
          name: 'namespace1',
          status: 'active',
          deployments: [{name: 'depl1', namespace: 'namespace1'}],
          pods: [{name: 'pod1', namespace: 'namespace1'}],
          services: [{name: 'service1', namespace: 'namespace1', type: 'cluster', clusterIP: '0.0.2', ports: [{ port: 3000 }]}]
        }
    };
    
    beforeEach(() => {
      nsCard = render(<NamespaceCard {...props}/>)
    });
    
    it('Renders NsExpanded on button click', () => {
    userEvent.click(screen.getByRole('button'));
    expect(nsCard.getByTestId('expanded')).toBeInTheDocument();
    })
  });
})