import { useEffect, useState } from 'react';
import './TestCaseScreen.scss'

function TestCaseScreen( {result} ) {
  const [activeTab, setActiveTab] = useState('result');

  const handleButtonClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="toolbar">
        <button
          className={`button ${activeTab === 'result' ? 'active' : ''}`}
          onClick={() => handleButtonClick('result')}
        >
          <i className="icon"></i>
          <span>Result</span>
        </button>
        <button
          className={`button ${activeTab === 'last-testcase' ? 'active' : ''}`}
          onClick={() => handleButtonClick('last-testcase')}
        >
          <i className="icon"></i>
          <span>Last Testcase</span>
        </button>
      </div>
      <div className={`testcase__result__details 
          ${activeTab === 'result' ? '' : 'hidden'}`}>
        {result === "" && <h3 className="centered">You must run your code first.</h3>}
        {result !== "" && (
          <>
            <h3 className="status">
              <p className={result.status === "ACCEPTED" ? "success__color" : "failed__color"}>
                {result.status}
              </p>
            </h3>
            <div className="right-border"></div>
            <p className="status">
              <h3 className="centered">Message</h3>
              <p className="centered">{result.message}</p>
            </p>
            <div className="right-border"></div>
            <p className="status">
              <h3 className="centered">Testcase</h3>
              <p className="centered">{result.passedTestcase} / {result.maxTestcase}</p>
            </p>
            <div className="right-border"></div>
            <p className="status">
              <h3 className="centered">Runtime</h3>
              <p className="centered">{result.runtime}s</p>
            </p>
            <div className="right-border"></div>
            <p className="status">
              <h3 className="centered">Memory Usage</h3>
              <p className="centered">{result.memory}MB</p>
            </p>
          </>
        )}
      </div>

      <div className={`last_testcase__details 
          ${activeTab === 'result' ? 'hidden' : ''}`}>
        This is last testcase
      </div>
    </>
  )
}

export default TestCaseScreen
