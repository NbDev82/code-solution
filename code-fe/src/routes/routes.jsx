import config from '~/config';

import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import ContestInvitation from '~/pages/ContestInvitation/ContestInvitation';
import Problems from '~/pages/Problems';
import Contests from '~/pages/Contests';
import Discuss from '~/pages/Discuss';
import NotFound from '~/components/Errors/NotFound';
import Profile from '~/pages/Profile';
import ContestsManagement from '~/pages/ContestsManagement/ContestsManagement';

const publicRoutes = [
  { path: config.routes.home[0], component: Home, exact: true },
  { path: config.routes.home[1], component: Home, exact: true },
  { path: config.routes.login, component: SignIn, exact: true },
  { path: config.routes.contest_invitation, component: ContestInvitation, exact: false },
  { path: config.routes.problems, component: Problems, exact: false },
  { path: config.routes.contests, component: Contests, exact: false },
  { path: config.routes.discuss, component: Discuss, exact: false },
  { path: config.routes.profile, component: Profile, exact: false },
  { path: "*", component: NotFound },
  { path: config.routes.contests_management, component: ContestsManagement },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
