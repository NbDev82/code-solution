import React, { useState } from 'react';
import ProblemScreen from '~/components/Problem/ProblemScreen';
import EditorScreen from '~/components/Editor/EditorScreen';
import NavbarProblem from '~/components/NavbarProblem/ProblemNavbar/NavbarProblem';
import TestCaseScreen from '~/components/TestCaseScreen/TestCaseScreen';
import MainNavbar from "~/components/NavbarProblem/MainNavbar/MainNavbar";
import "./SubmitCodeScreen.scss"

function SubmitCodeScreen() {
  const [result, setResult] = useState("")

  return (
    <React.Fragment>
      <section>
        <div className="layout">
          <div className="nav__layout centered">
            <MainNavbar/>
          </div>

          <div className="nav__problem__layout centered">
            <NavbarProblem/>
          </div>

          <div className="problem__layout">
            <ProblemScreen/>
          </div>

          <div className="editor__layout">
            <EditorScreen setResult={setResult}/>
          </div>

          <div className="testcases_layout">
            <TestCaseScreen result={result}/>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export  default SubmitCodeScreen