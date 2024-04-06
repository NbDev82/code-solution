import { useContext, useEffect, useState } from 'react';
import './NavbarProblem.scss';
import { AppContext } from '~/pages/SubmitCode/SubmitCodeScreen';

function NavbarProblem() {
  const { activeMenuItem, setActiveMenuItem } = useContext(AppContext);

  const handleMenuItemClick = (event) => {
    setActiveMenuItem(event.target.value);
  };

  return (
    <div className="navbar__container">
      <ul className="navbar__menu">
        <button
          value="Description"
          onClick={handleMenuItemClick}
          className={`navbar__menu-item ${activeMenuItem === 'Description' ? 'menu__active' : ''}`}
        >
          Description
        </button>
        <button
          value="Discusses"
          onClick={handleMenuItemClick}
          className={`navbar__menu-item ${activeMenuItem === 'Discusses' ? 'menu__active' : ''}`}
        >
          Discusses
        </button>
        <button
          value="Submissions"
          onClick={handleMenuItemClick}
          className={`navbar__menu-item ${activeMenuItem === 'Submissions' ? 'menu__active' : ''}`}
        >
          Submissions
        </button>
      </ul>
    </div>
  );
}

export default NavbarProblem;
