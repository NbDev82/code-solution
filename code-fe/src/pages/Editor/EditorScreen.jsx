import { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react"
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
      <div className="App">
        <Editor
          height="100vh"
          width="50%"
          theme="vs-dark"
          defaultLanguage={language}
          defaultValue={code}
          onChange={handleEditorChange}
        />
        <button onClick={handleSendCode}>Send Code</button>
      </div>
    </>
  )
}

export default EditorScreen
