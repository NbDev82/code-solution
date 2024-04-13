import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useNavigate } from 'react-router-dom';

import '../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import Button from '~/components/Buttons/Button';
import DrawerRightDefault from '~/components/Drawers/DrawerRightDefault';
import { useDisclosure } from '@chakra-ui/react';
import { getCurrentUserDetail } from '~/auth';

function MainNavbar(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(getCurrentUserDetail());

  const handleRoutePages = (id) => {
    switch (id) {
      case 'problems':
        navigate('/problems');
        break;
      case 'contests':
        navigate('/contests');
        break;
      case 'discuss':
        navigate('/discuss');
        break;
      default:
        console.error('Action is invalid');
    }
  };
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <div className="navbar--list__gap20">
          <Button id="problems" icon onClick={handleRoutePages}>
            Problems
          </Button>
          <Button id="contests" icon onClick={handleRoutePages}>
            Contests
          </Button>
          <Button id="discuss" icon onClick={handleRoutePages}>
            Discuss
          </Button>
        </div>
      </div>
      <div className="navbar__group">
        <Button id="notify" icon disable>
          <NotificationsNoneIcon sx={{ fontSize: 28 }}></NotificationsNoneIcon>
        </Button>
        <Avatar size="lg" name={user.fullName} onClick={onOpen} src={user.avatarSrc} />
      </div>
      <DrawerRightDefault user={user} isOpen={isOpen} onClose={onClose}></DrawerRightDefault>
    </div>
  );
}
export default React.memo(MainNavbar);
