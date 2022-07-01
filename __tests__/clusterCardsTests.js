import React from 'React';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import { getByLabelText, getByText, getByTestId, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import regeneratorRuntime from 'regenerator-runtime';

import store from '../src/store';
import App from '../src/App';
import NamespaceCard from '../src/components/cluster_cards/NamespaceCard';
import DeploymentsCard from '../src/components/cluster_cards/DeploymentsCard';
import Deployment from '../src/components/cluster_cards/Deployment';
import PodsCard from '../src/components/cluster_cards/PodsCard';
import Pod from '../src/components/cluster_cards/Pod'
import ServicesCard from '../src/components/cluster_cards/ServicesCard';
import Service from '../src/components/cluster_cards/Service';

describe('REACT Unit testing', () => {
  const props = {
     namespaces: [
       {
        creationTime: '2022-06-27T17:08:47.153Z',
        name: 'namespace1',
        status: 'active',
        deployments: [{name: 'depl1', namespace: 'namespace1'}],
        pods: [{name: 'pod1', namespace: 'namespace1'}],
        services: [{name: 'service1', namespace: 'namespace1'}]
       }
     ],
     deployments: [],
     pods: [],
     services: [],
     totalObjects: 0
   }

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
    }

   beforeEach(() => {
    nsCard = render(<NamespaceCard {...props}/>)
   })

   test('Renders NsFrontBack on load', () => {
    expect(nsCard.getByTestId('nsList')).toBeInTheDocument();
    expect(nsCard.getAllByRole('listitem').length).toBe(5);
  })

  test('Renders NsFrontBack with passed in props', () => {
    expect(screen.getAllByText(props.namespace.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(props.namespace.name)).toHaveLength(2);
    expect(screen.getAllByText(props.namespace.status)[0]).toBeInTheDocument();
    expect(screen.getAllByText(props.namespace.name)).toHaveLength(2);
    expect(screen.getAllByText(props.namespace.deployments.length)).toHaveLength(3);
  })

  test('Renders 1 button initially', () => {
    expect(screen.getAllByRole('button')).toHaveLength(1);
  })
  
  describe('DeploymentsCard', () => {
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
    
    test('Renders NsExpanded on button click', () => {
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('expanded')).toBeInTheDocument();
  })
  })
   })
});