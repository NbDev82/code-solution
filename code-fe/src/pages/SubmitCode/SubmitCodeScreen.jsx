import React from 'react';
import Navbar from '~/components/Navbars/HomeNavbar';
import ProblemScreen from '~/components/Problem/ProblemScreen';
import EditorScreen from '~/components/Editor/EditorScreen';
import NavProblem from '~/components/NavbarProblem/NavProblem';
import TestCaseScreen from '~/components/TestCaseScreen/TestCaseScreen';
import "./SubmitCodeScreen.scss"

function SubmitCodeScreen() {
  return (
    <React.Fragment>
      <section>
        <div className="layout">
          <div className="nav__layout centered">
            <Navbar/>
          </div>

          <div className="nav__problem__layout centered">
            <NavProblem/>
          </div>

          <div className="problem__layout centered">
            <ProblemScreen/>
          </div>

          <div className="editor__layout">
            <EditorScreen/>
          </div>

          <div className="testcases_layout centered">
            <TestCaseScreen/>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export  default SubmitCodeScreen