import React from 'react';
import './HomeNavbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import ButtonLight from '~/components/Buttons/ButtonLight';

function HomeNavbar() {
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <ButtonLight value="Develop"></ButtonLight>
        <ButtonLight value="Contest"></ButtonLight>
        <ButtonLight value="Discuss"></ButtonLight>
        <ButtonLight value="Sign In"></ButtonLight>
      </div>
    </div>
  );
}
export default HomeNavbar;
