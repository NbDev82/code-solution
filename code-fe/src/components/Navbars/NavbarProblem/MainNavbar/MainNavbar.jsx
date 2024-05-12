import React, { useContext, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar } from '@chakra-ui/react';
import { getCurrentUserDetail } from '~/auth';
import DrawerRightDefault from '~/components/Drawers/DrawerRightDefault';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DrawerProblemList from '~/components/Drawers/DrawerProblemList';
import '../../Navbar.scss';
import LogoGroup from '~/assets/images/Logo-Group.svg';
import Button from '~/components/Buttons/Button';
import { ProblemContext } from '~/context/Problem';

function MainNavbar(props) {
  const [user, setUser] = useState(getCurrentUserDetail());
  const { problems } = useContext(ProblemContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenProblemsList, setIsOpenProblemsList] = useState(false);
  const iconStyle = { fontSize: 20 };
  const navigate = useNavigate();
  const handleCloseProblemsList = () => {
    setIsOpenProblemsList(false);
  };

  return (
    <div className="navbar">
      <img
        className="navbar--logo"
        src={LogoGroup}
        alt="Logo"
        onClick={() => {
          navigate('/home');
        }}
      />
      <div className="navbar--list">
        <div className="navbar--list__gap5">
          <Button
            icon
            id="problemslist"
            onClick={() => {
              setIsOpenProblemsList(true);
            }}
          >
            <FormatListBulletedIcon sx={iconStyle}></FormatListBulletedIcon>
            <span>Problems List</span>
          </Button>
          {/* <Button icon id="back" onClick={props.onSelectBtn}>
            <ArrowBackIosIcon sx={iconStyle}></ArrowBackIosIcon>
          </Button>
          <Button icon id="next" onClick={props.onSelectBtn}>
            <ArrowForwardIosIcon sx={iconStyle}></ArrowForwardIosIcon>
          </Button> */}
          <Button icon id="pickone" onClick={props.onSelectBtn}>
            <ShuffleIcon sx={iconStyle}></ShuffleIcon>
          </Button>
        </div>
        {/* <div className="navbar--list__gap5">
          <Button icon disable>
            <AccessTimeIcon sx={iconStyle}></AccessTimeIcon>
            <span style={iconStyle}>11:25</span>
          </Button>
        </div> */}
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
        {/* <Button icon id="notify" onClick={props.onSelectBtn}>
          <NotificationsNoneIcon sx={iconStyle}></NotificationsNoneIcon>
        </Button> */}
        <Avatar size="lg" cursor="pointer" name={user?.fullName} onClick={onOpen} src={user?.urlImage} />
      </div>
      <DrawerProblemList
        problems={problems}
        isOpen={isOpenProblemsList}
        onClose={handleCloseProblemsList}
      ></DrawerProblemList>
      <DrawerRightDefault user={user} isOpen={isOpen} onClose={onClose}></DrawerRightDefault>
    </div>
  );
}
export default React.memo(MainNavbar);
