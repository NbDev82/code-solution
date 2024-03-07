import { useEffect, useState } from 'react';
import './TestCaseScreen.scss'

function TestCaseScreen( {result} ) {

  return (
    <>
      <div>
        TESTCASES SCREEN:<br />
        Status: {result.status}<br />
        Message: {result.message}<br />
      </div>
    </>
  )
}

export default TestCaseScreen
