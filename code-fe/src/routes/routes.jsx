import config from '~/config';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: SignIn },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
