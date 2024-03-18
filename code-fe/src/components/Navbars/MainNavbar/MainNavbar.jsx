import React from 'react';
import { Avatar } from '@chakra-ui/react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import '../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import AvatarSample from '~/assets/images/AvatarSample.png';
import Button from '~/components/Buttons/Button';

function MainNavbar(props) {
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <div className="navbar--list__gap20">
          <Button id="problems" light onClick={props.onSelectBtn}>
            Problems
          </Button>
          <Button id="contests" light onClick={props.onSelectBtn}>
            Contests
          </Button>
          <Button id="disscuss" light onClick={props.onSelectBtn}>
            Discuss
          </Button>
        </div>
      </div>
      <div className="navbar__group">
        <Button id="notify" icon onClick={props.onSelectBtn}>
          <NotificationsNoneIcon sx={{ fontSize: 28 }}></NotificationsNoneIcon>
        </Button>
        <Avatar size="lg" name="My" src={AvatarSample} />
      </div>
    </div>
  );
}
export default React.memo(MainNavbar);
