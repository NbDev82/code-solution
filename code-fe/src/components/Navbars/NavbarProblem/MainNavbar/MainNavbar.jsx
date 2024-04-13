import React,{useContext} from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '@chakra-ui/react';
import {ProblemContext} from '~/pages/SubmitCode/SubmitCodeScreen'

import '../../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import Button from '~/components/Buttons/Button';

function MainNavbar(props) {
  const {user} = useContext(ProblemContext);
  const iconStyle = {fontSize: 20}
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <div className="navbar--list__gap5">
          <Button icon id="problemslist" onClick={props.onSelectBtn}>
            <FormatListBulletedIcon sx={iconStyle}></FormatListBulletedIcon>
            <span>Problems List</span>
          </Button>
          <Button icon id="back" onClick={props.onSelectBtn}>
            <ArrowBackIosIcon sx={iconStyle}></ArrowBackIosIcon>
          </Button>
          <Button icon id="next" onClick={props.onSelectBtn}>
            <ArrowForwardIosIcon sx={iconStyle}></ArrowForwardIosIcon>
          </Button>
          <Button icon id="pickone" onClick={props.onSelectBtn}>
            <ShuffleIcon sx={iconStyle}></ShuffleIcon>
          </Button>
        </div>
        <div className="navbar--list__gap5">
          <Button icon disable>
            <AccessTimeIcon sx={iconStyle}></AccessTimeIcon>
            <span style={iconStyle}>11:25</span>
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
          <NotificationsNoneIcon sx={iconStyle}></NotificationsNoneIcon>
        </Button>
        <Avatar size="lg" name={user.fullName} src={user.avatarSrc} />
      </div>
    </div>
  );
}
export default React.memo(MainNavbar);
