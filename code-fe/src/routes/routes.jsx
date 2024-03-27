import config from '~/config';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import ContestInvitation from '~/pages/ContestInvitation/ContestInvitation';
import Problems from '~/pages/Problems';
import Contests from '~/pages/Contests';
import Discuss from '~/pages/Discuss';
import ContestsManagement from '~/pages/ContestsManagement/ContestsManagement';

const publicRoutes = [
  { path: config.routes.home[0], component: Home },
  { path: config.routes.home[1], component: Home },
  { path: config.routes.login, component: SignIn },
  { path: config.routes.contest_invitation, component: ContestInvitation },
  { path: config.routes.problems, component: Problems },
  { path: config.routes.contests, component: Contests },
  { path: config.routes.discuss, component: Discuss },
  { path: config.routes.contests_management, component: ContestsManagement },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
