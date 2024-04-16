import config from '~/config';
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import ContestInvitation from '~/pages/ContestInvitation/ContestInvitation';
import Problems from '~/pages/Problems';
import Contests from '~/pages/Contests';
import PostPage from '~/pages/Discuss';
import NotFound from '~/components/Errors/NotFound';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import ContestsManagement from '~/pages/ContestsManagement/ContestsManagement';
import AddContest from '~/pages/AddContest/AddContest';
import ContestResult from '~/pages/ContestResult/ContestResult';
import SubmitCode from '~/pages/SubmitCode';

const publicRoutes = [
  { path: config.routes.home[0], component: Home, exact: true },
  { path: config.routes.home[1], component: Home, exact: true },
  { path: config.routes.login, component: SignIn, exact: true },
  { path: config.routes.signUp, component: SignUp, exact: true },
  { path: config.routes.post, component: PostPage, exact: true },
  { path: config.routes.contest_invitation, component: ContestInvitation, exact: false },
  { path: config.routes.problems, component: Problems, exact: true },
  { path: config.routes.submit_code, component: SubmitCode, exact: false },
  { path: config.routes.contests, component: Contests, exact: false },
  { path: config.routes.discuss, component: PostPage, exact: false },
  { path: config.routes.profile, component: Profile, exact: false },
  { path: config.routes.contests_management, component: ContestsManagement },
  { path: config.routes.add_contest, component: AddContest },
  { path: config.routes.contest_result, component: ContestResult },
  { path: '*', component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
