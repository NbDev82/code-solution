import React, { useContext, useState } from 'react';
import * as XLSX from 'xlsx';
import styles from '../styles.module.scss';
import { ProblemDetailsContext } from '~/context/ProblemDetails';

const XLSXUploader = () => {
  const { setDialogProps, getDataXLSXToTestcases, setTestcases } = useContext(ProblemDetailsContext);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFile = (file) => {
    setSelectedFile(file);
    let errorMsg = '';
    try {
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const testcaseList = getDataXLSXToTestcases(rows);
            if (testcaseList !== 0) {
              setTestcases(testcaseList);
            } else {
              errorMsg =
                'The process of converting data from your .xlsx file to testcases has encountered an error. Please review the data from the file.';
            }
          });
        };
        reader.readAsBinaryString(file);
      } else {
        errorMsg = 'The selected file is not a valid Blob object.';
      }
    } catch (error) {
      errorMsg = 'Read file .xlsx failed! ' + error;
    }
    if (errorMsg !== '') {
      setDialogProps((prev) => ({
        ...prev,
        msg: errorMsg,
        isOpen: true,
        onYesClick: () => {},
      }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} accept=".xlsx" type="file" onChange={handleInputChange} />
      <div
        className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Drag & drop file here or click to browse</p>
      </div>
      {selectedFile && <p className={styles.file__name}>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default XLSXUploader;
