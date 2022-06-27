import React from 'React';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import store from '../client/store';
import App from '../src/App';
import NamespaceCard from '../src/components/cluster_cards/NamespaceCard';
import DeploymentsCard from '../src/components/cluster_cards/DeploymentsCard';
import Deployment from '../src/components/cluster_cards/Deployment';
import PodsCard from '../src/components/cluster_cards/PodsCard';
import Pod from '../src/components/cluster_cards/Pod'
import ServicesCard from '../src/components/cluster_cards/ServicesCard';
import Service from '../src/components/cluster_cards/Service';

describe('Unit testing React components', () => {

  describe('NamespaceCard', () => {
    
  })
})