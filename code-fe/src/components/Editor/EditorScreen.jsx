import { useContext, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import Button from '../../components/Buttons/Button';
import { AppContext } from '~/pages/SubmitCode/SubmitCodeScreen';
import './EditorScreen.scss';
import axios from 'axios';

function EditorScreen() {
  const { setResult } = useContext(AppContext);
  const { problemId } = useContext(AppContext);
  const { code, setCode } = useContext(AppContext);
  const { language, setLanguage } = useContext(AppContext);

  const handleEditorChange = (code) => {
    setCode(code);
  };

  const handleLanguageChange = async (event) => {
    setLanguage(event.target.value);
  };

  const fetchCode = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/submit-code/getInputCode', {
        params: {
          problemId: problemId,
          language: language,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching code:', error);
      return error.response?.data?.message;
    }
  };

  useEffect(() => {
    fetchCode().then((data) => {
      setCode(data);
    });
  }, [problemId, language]);

  return (
    <>
      <div className="navbar__editor">
        <select onChange={handleLanguageChange} className="lg:block selected__language">
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="python">Python</option>
        </select>
        {/* <Button fontSize="16px" className="lg:block selected__language" onClick={handleSendCode}>
          Submit Code
        </Button> */}
      </div>

      <Editor
        height="48vh"
        width="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={handleEditorChange}
      />
    </>
  );
}

export default EditorScreen;
