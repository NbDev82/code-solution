import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '@chakra-ui/react';

import '../../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import AvatarSample from '~/assets/images/AvatarSample.png';
import Button from '~/components/Buttons/Button';

function MainNavbar(props) {
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <div className="navbar--list__gap5">
          <Button icon id="problemslist" onClick={props.onSelectBtn}>
            <FormatListBulletedIcon sx={{ fontSize: 24 }}></FormatListBulletedIcon>
            <span>Problems List</span>
          </Button>
          <Button icon id="back" onClick={props.onSelectBtn}>
            <ArrowBackIosIcon sx={{ fontSize: 24 }}></ArrowBackIosIcon>
          </Button>
          <Button icon id="next" onClick={props.onSelectBtn}>
            <ArrowForwardIosIcon sx={{ fontSize: 24 }}></ArrowForwardIosIcon>
          </Button>
          <Button icon id="pickone" onClick={props.onSelectBtn}>
            <ShuffleIcon sx={{ fontSize: 24 }}></ShuffleIcon>
          </Button>
        </div>
        <div className="navbar--list__gap5">
          <Button icon disable>
            <AccessTimeIcon sx={{ fontSize: 24 }}></AccessTimeIcon>
            <span>11:25</span>
          </Button>
        </div>
        <div className="navbar--list__gap5">
          <Button light id="compile" onClick={props.onSelectBtn}>
            Compile
          </Button>
          <Button highlight id="submit" onClick={props.onSelectBtn}>
            Submit
          </Button>
        </div>
      </div>
      <div className="navbar__group">
        <Button icon id="notify" onClick={props.onSelectBtn}>
          <NotificationsNoneIcon sx={{ fontSize: 24 }}></NotificationsNoneIcon>
        </Button>
        <Avatar size="lg" name="My" src={AvatarSample} />
      </div>
    </div>
  );
}
export default React.memo(MainNavbar);
