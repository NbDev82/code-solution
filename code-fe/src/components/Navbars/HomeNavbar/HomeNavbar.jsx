import React, { useState, useEffect } from 'react';
import '../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import Button from '~/components/Buttons/Button';
import { useDisclosure, Avatar } from '@chakra-ui/react';
import { getCurrentUserDetail } from '~/auth';
import DrawerRightDefault from '~/components/Drawers/DrawerRightDefault';
function HomeNavbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(getCurrentUserDetail());

  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <div className="navbar--list__gap20">
          <Button id="develop" light onClick={props.onSelectBtn}>
            Develop
          </Button>
          <Button id="contest" light onClick={props.onSelectBtn}>
            Contest
          </Button>
          <Button id="discuss" light onClick={props.onSelectBtn}>
            Discuss
          </Button>
          {user ? (
            <></>
          ) : (
            <Button id="signin" light onClick={props.onSelectBtn}>
              Sign In
            </Button>
          )}
        </div>
        {user ? (
          <>
            <div className="navbar__group">
              <Avatar size="lg" cursor="pointer" name={user?.fullName} onClick={onOpen} src={user?.urlImage} />
            </div>
            <DrawerRightDefault user={user} isOpen={isOpen} onClose={onClose}></DrawerRightDefault>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default React.memo(HomeNavbar);
