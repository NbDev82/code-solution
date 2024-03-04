import React from 'react';
import './HomeNavbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import ButtonLight from '~/components/Buttons/ButtonLight';

function HomeNavbar() {
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <ButtonLight children="Develop"></ButtonLight>
        <ButtonLight children="Contest"></ButtonLight>
        <ButtonLight children="Discuss"></ButtonLight>
        <ButtonLight children="Sign In"></ButtonLight>
      </div>
    </div>
  );
}
export default HomeNavbar;
