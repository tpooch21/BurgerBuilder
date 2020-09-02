import React from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const app = () => (
  <div>
    <Layout>
      <BurgerBuilder/>
    </Layout>
  </div>
);

export default app;
