import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
