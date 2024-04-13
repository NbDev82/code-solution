import { useContext, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { AppContext } from '~/pages/SubmitCode/SubmitCodeScreen';
import './EditorScreen.scss';
import queryString from 'query-string';
import { getInputCode, runCode } from '~/services/SubmitCodeService';

const EditorScreen = () => {
  const { setResult } = useContext(AppContext);
  const { problemId } = useContext(AppContext);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const fetchCode = async () => {
    try {
      const response = await getInputCode(queryString.stringify({ problemId, language }));
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

  const handleSendCode = async () => {
    const request = {
      userId: 1, // will amend soon
      code: code,
      language: language,
      problemId: problemId, // will amend soon
    };
    try {
      const response = await runCode(request);
      setResult(response.data);
      console.log('Server response:', response.data);
    } catch (error) {
      setResult(error?.response?.data.message);
      console.error('Error sending code:', error.response.data.message);
    }
  };

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
      <Editor
        height="48vh"
        width="100%"
        language={language}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </>
  );
};

export default EditorScreen;
