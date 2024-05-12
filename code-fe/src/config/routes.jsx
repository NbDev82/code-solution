import UserDashboard from '~/pages/User/UserDashboard';
import { updatePost } from '~/services/DiscussService';
import { signUp } from '~/services/UserService';

const routes = {
  home: ['/', '/home'],
  login: '/sign-in',
  signUp: '/sign-up',
  problems: '/problems',
  contests: '/contests',
  discuss: '/discuss',
  profile: '/profile',
  submit_code: '/problems/:problemName',
  contest_invitation: '/contest-invitation',
  contests_management: '/contests-management',
  add_contest: '/add-contest',
  contest_result: '/contest-result',
  post: '/posts/:postId',
  user_dashboard: '/user/:userId/posts',
  update_post: 'user/update-post/:postId',
  problem_details:'/problem-details/:action'
};

export default routes;
