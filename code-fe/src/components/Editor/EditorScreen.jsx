import { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react"
import Button from "../../components/Buttons/ButtonDark"
import './EditorScreen.scss'
import axios from 'axios';

function EditorScreen() {
  const [count, setCount] = useState(0)

  const [code, setCode] = useState('');

  const [language, setLanguage] = useState('java');

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const problemId = 4
        const response = await axios.get('http://localhost:8000/api/submit-code/getInputCode', { params: {
            problemId: problemId,
            language: "Java"
          } });
        console.log('Server response:', response.data);
        setCode(response.data);
      } catch (error) {
        console.error('Error fetching code:', error);
      }
    };
    fetchCode()
  }, []);

  const handleSendCode = () => {
    const request = {
      userId: 2,
      code: code,
      language: "java",
      problemId: 4
    };

    axios.post('http://localhost:8000/api/submit-code/run', request)
      .then(response => {
        console.log('Server response:', response.data);
      })
      .catch(error => {
        console.error('Error sending code:', error);
        // Xử lý lỗi nếu có
      });
  };

  return (
    <>
      <div className="navbar__editor">
        <select className="hidden lg:block selected__language">
          <option value="java">java</option>
          <option value="c#">c#</option>
          <option value="python">python</option>
        </select>
        <Button onClick={handleSendCode}>Submit Code</Button>
      </div>

      <Editor
        height="48vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={code}
        onChange={handleEditorChange}
      />
    </>
  )
}

export default EditorScreen
