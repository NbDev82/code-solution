import config from '~/config';
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import ContestInvitation from '~/pages/ContestInvitation/ContestInvitation';
import Problems from '~/pages/Problems';
import Contests from '~/pages/Contests';
import Discuss from '~/pages/Discuss';
import NotFound from '~/components/Errors/NotFound';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import ContestsManagement from '~/pages/ContestsManagement/ContestsManagement';
import AddContest from '~/pages/AddContest/AddContest';
import ContestResult from '~/pages/ContestResult/ContestResult';

const publicRoutes = [
  { path: config.routes.home[0], component: Home, exact: true },
  { path: config.routes.home[1], component: Home, exact: true },
  { path: config.routes.login, component: SignIn, exact: true },
  { path: config.routes.SignUp, component: SignUp, exact: true },
  { path: config.routes.contest_invitation, component: ContestInvitation, exact: false },
  { path: config.routes.problems, component: Problems, exact: false },
  { path: config.routes.contests, component: Contests, exact: false },
  { path: config.routes.discuss, component: Discuss, exact: false },
  { path: config.routes.profile, component: Profile, exact: false },
  { path: '*', component: NotFound },
  { path: config.routes.contests_management, component: ContestsManagement },
  { path: config.routes.add_contest, component: AddContest },
  { path: config.routes.contest_result, component: ContestResult },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
