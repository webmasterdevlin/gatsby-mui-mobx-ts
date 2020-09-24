import React from 'react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import Layout from './src/components/layout/';

const wrapWithLayout = (context: WrapPageElementBrowserArgs) => {
  return <Layout>{context.element}</Layout>;
};

export default wrapWithLayout;
