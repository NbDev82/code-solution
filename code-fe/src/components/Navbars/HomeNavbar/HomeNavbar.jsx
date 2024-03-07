import React from 'react';
import './HomeNavbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import ButtonLight from '~/components/Buttons/ButtonLight';

function HomeNavbar(props) {
  return (
    <div className="navbar">
      <img className="navbar--logo" src={LogoGroup} alt="Logo" />
      <div className="navbar--list">
        <ButtonLight id="btnDevelop" children="Develop" onClick={props.onSelectBtn}></ButtonLight>
        <ButtonLight id="btnContest" children="Contest" onClick={props.onSelectBtn}></ButtonLight>
        <ButtonLight id="btnDiscuss" children="Discuss" onClick={props.onSelectBtn}></ButtonLight>
        <ButtonLight id="btnSignin" children="Sign In" onClick={props.onSelectBtn}></ButtonLight>
      </div>
    </div>
  );
}
export default HomeNavbar;
