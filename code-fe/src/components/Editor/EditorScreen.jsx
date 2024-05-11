import { useContext, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { ProblemContext } from '~/context/Problem';
import './EditorScreen.scss';
import queryString from 'query-string';
import { getInputCode, runCode } from '~/services/SubmitCodeService';

const EditorScreen = () => {
  const { problem, code, setCode, language, setLanguage } = useContext(ProblemContext);
  const fetchCode = async () => {
    try {
      const response = await getInputCode(queryString.stringify({ problemId: problem.id, language }));
      return response.data;
    } catch (error) {
      console.error('Error fetching code:', error);
      return error.response?.data?.message;
    }
  };

  const handleEditorChange = (code) => {
    setCode(code);
  };

  useEffect(() => {
    fetchCode().then((data) => {
      setCode(data);
    });
  }, [problem.id, language]);

  useEffect(() => {
    console.log('change');
  }, [language]);

  return (
    <>
      <div className="navbar__editor">
        <select onChange={(e) => setLanguage(e.currentTarget.value)} className="selected__language">
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="python">Python</option>
        </select>
      </div>
      <Editor height="40vh" width="100%" language={language} value={code} onChange={handleEditorChange} />
    </>
  );
};

export default EditorScreen;
