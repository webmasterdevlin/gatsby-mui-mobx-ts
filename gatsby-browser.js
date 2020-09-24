import './src/styles/global.css';

const getBaseRoute = path => (path ? path.split('/')[1] : '');

export const shouldUpdateScroll = props => {
  const prevRoute = getBaseRoute(props.prevRouterProps.location.pathname);
  const currRoute = getBaseRoute(props.routerProps.location.pathname);
  return prevRoute !== currRoute;
};

export { default as wrapRootElement } from './wrap-with-provider';
export { default as wrapPageElement } from './wrap-with-layout';
