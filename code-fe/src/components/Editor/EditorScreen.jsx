import {useContext, useEffect, useState} from 'react';
import Editor from "@monaco-editor/react"
import Button from "../../components/Buttons/ButtonDark"
import {AppContext} from "~/pages/SubmitCode/SubmitCodeScreen";
import './EditorScreen.scss'
import axios from 'axios';

function EditorScreen() {
  const {setResult} = useContext(AppContext);
  const [code, setCode] = useState('');

  const [language, setLanguage] = useState('java');

  const handleEditorChange = (code, event) => {
    setCode(code);
  };

  const handleLanguageChange = async (event) => {
    setLanguage(event.target.value)
  }

  const fetchCode = async () => {
    try {
      const problemId = 1
      const response = await axios.get('http://localhost:8000/api/submit-code/getInputCode', {
        params: {
          problemId: problemId,
          language: language
        } });
      setCode(response.data);
    } catch (error) {
      setCode('Error fetching code:' + error.response?.data?.message)
      console.error('Error fetching code:', error);
    }
  };

  useEffect(() => {
     fetchCode()
  }, [language]);

  const handleSendCode = () => {
    const request = {
      userId: 1, // will amend soon
      code: code,
      language: language,
      problemId: 1 // will amend soon
    };

    axios.post('http://localhost:8000/api/submit-code/run', request)
      .then(response => {
        setResult(response.data)
        console.log('Server response:', response.data);
      })
      .catch(error => {
        setResult(error?.response?.data.message)
        console.error('Error sending code:', error.response.data.message);
      });
  };

  return (
    <>
      <div className="navbar__editor">
        <select onChange={handleLanguageChange} className="lg:block selected__language">
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="python">Python</option>
        </select>
        <Button onClick={handleSendCode}>Submit Code</Button>
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
  )
}

export default EditorScreen
