import config from '~/config';
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import ContestInvitation from '~/pages/ContestInvitation/ContestInvitation';
import Problems from '~/pages/Problems';
import DiscussPage from '~/pages/Discuss';
import PostPage from '~/pages/PostPage/PostPage';
import NotFound from '~/components/Errors/NotFound';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import ContestsManagement from '~/pages/ContestsManagement/ContestsManagement';
import AddContest from '~/pages/AddContest/AddContest';
import ContestResult from '~/pages/ContestResult/ContestResult';
import SubmitCode from '~/pages/SubmitCode';
import UserDashboard from '~/pages/User/UserDashboard';
import UpdatePost from '~/pages/UpdatePost/UpdatePost';
import ProblemDetails from '~/pages/ProblemDetails';
import UpdateContest from '~/pages/UpdateContest/UpdateContest';

const publicRoutes = [
  { path: config.routes.home[0], component: Home },
  { path: config.routes.home[1], component: Home },
  { path: config.routes.login, component: SignIn },
  { path: config.routes.signUp, component: SignUp },
  { path: config.routes.post, component: PostPage },
  { path: `${config.routes.discuss}/category/:categoryId`, component: DiscussPage },
  { path: config.routes.contest_invitation, component: ContestInvitation },
  { path: config.routes.problems, component: Problems },
  { path: config.routes.submit_code, component: SubmitCode },
  { path: config.routes.discuss, component: DiscussPage },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.contests_management, component: ContestsManagement },
  { path: config.routes.add_contest, component: AddContest },
  { path: config.routes.contest_result, component: ContestResult },
  { path: config.routes.user_dashboard, component: UserDashboard },
  { path: config.routes.update_post, component: UpdatePost },
  { path: config.routes.problem_details, component: ProblemDetails },
  { path: config.routes.update_contest, component: UpdateContest },
  { path: '*', component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
