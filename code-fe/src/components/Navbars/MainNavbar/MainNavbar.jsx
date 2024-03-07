import React from 'react';
import './MainNavbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import Bell from '~/assets/images/Bell.svg';
import AvatarSample from '~/assets/images/AvatarSample.png';
import ButtonLight from '~/components/Buttons/ButtonLight';
import { Avatar } from '@chakra-ui/react';

function MainNavbar() {
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <ButtonLight children="Problems"></ButtonLight>
        <ButtonLight children="Contests"></ButtonLight>
        <ButtonLight children="Discuss"></ButtonLight>
      </div>
      <div className="navbar__group">
        <img className="navbar__group--notify" src={Bell} alt="Bell Icon"></img>
        <Avatar className="navbar__group--avatar" borderRadius="100%" name="My" src={AvatarSample} />
      </div>
    </div>
  );
}
export default MainNavbar;
