import config from '~/config';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import ContestInvitation from '~/pages/ContestInvitation/ContestInvitation';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: SignIn },
  { path: config.routes.contest_invitation, component: ContestInvitation },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
