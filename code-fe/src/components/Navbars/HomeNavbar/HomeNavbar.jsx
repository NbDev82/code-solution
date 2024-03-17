import React from 'react';
import '../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import Button from '~/components/Buttons/Button';

function HomeNavbar(props) {
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
          <Button id="signin" light onClick={props.onSelectBtn}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
export default React.memo(HomeNavbar);
