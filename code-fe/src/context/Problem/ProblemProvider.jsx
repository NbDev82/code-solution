import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProblemContext from './ProblemContext';
import { getCurrentUserDetail } from '~/auth';
function ProblemProvider({value,children }) {
  return (
    <ProblemContext.Provider
      value={value}
    >
      {children}
    </ProblemContext.Provider>
  );
}

export default ProblemProvider;
