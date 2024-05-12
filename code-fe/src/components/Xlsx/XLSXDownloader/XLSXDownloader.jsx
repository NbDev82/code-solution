import React from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import Button from '~/components/Buttons/Button';
import { DownloadIcon } from '@chakra-ui/icons';
const XLSXDownloader = (props) => {
  const handleDownload = (_) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(props.data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, props.filename || 'data.xlsx');
  };

  return (
    <Button link color='var(--primary-color)' onClick={handleDownload}>
      {props.title}
      <DownloadIcon></DownloadIcon>
    </Button>
  );
};

XLSXDownloader.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
  title: PropTypes.string,
};

export default XLSXDownloader;
