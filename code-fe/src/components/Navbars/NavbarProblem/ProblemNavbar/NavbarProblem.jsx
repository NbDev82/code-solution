import {useContext} from 'react';
import "./NavbarProblem.scss"
import {ProblemContext} from "~/pages/SubmitCode/SubmitCodeScreen";
import { HStack } from '@chakra-ui/react';

function NavbarProblem() {
    const {activeMenuItem, setActiveMenuItem} = useContext(ProblemContext);
    return (
        <div className="navbar__container">
            <HStack className="navbar__menu">
                <button value="Description" onClick={(e)=>setActiveMenuItem(e.currentTarget.value)} className={`navbar__menu-item ${activeMenuItem === 'Description' ? 'menu__active' : ''}`}>
                    Description
                </button>
                <button value="Discusses" onClick={(e)=>setActiveMenuItem(e.currentTarget.value)} className={`navbar__menu-item ${activeMenuItem === 'Discusses'? 'menu__active' : ''}`}>
                    Discusses
                </button>
                <button value="Submissions" onClick={(e)=>setActiveMenuItem(e.currentTarget.value)} className={`navbar__menu-item ${activeMenuItem === 'Submissions'? 'menu__active' : ''}`}>
                    Submissions
                </button>
            </HStack>
        </div>
    )
}

export default NavbarProblem