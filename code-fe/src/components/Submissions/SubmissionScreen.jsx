import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProblemContext } from '~/context/Problem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff',
    },
  },
});

function SubmissionScreen() {
  const { user, problem } = useContext(ProblemContext);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions(user.id, problem.id).then((data) => {
      console.log(data);
      setSubmissions(data);
    });
  }, [user, problem]);

  const fetchSubmissions = async (userId, problemId) => {
    try {
      const response = await axios.get('http://localhost:8000/api/submissions/gets', {
        params: {
          userId: userId,
          problemId: problemId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching problem:', error);
      return error?.response?.data;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          height: '78vh',
        }}
      >
        <Paper elevation={3} sx={{ padding: 2, maxHeight: '78vh', overflow: 'auto' }}>
          <Box>
            <TableContainer
              component={Paper}
              // sx={{
              //   backgroundColor: 'white',
              //   borderRadius: 1,
              // }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Runtime</TableCell>
                    <TableCell>Memory</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.length > 0 ? (
                    submissions.map((submission) => (
                      <TableRow key={submission.id} hover>
                        <TableCell>
                          <Typography
                            variant="body1"
                            color={submission.status.toLowerCase() === 'accepted' ? 'primary' : 'error'}
                            fontWeight="bold"
                          >
                            {submission.status}
                          </Typography>
                          <Typography variant="caption">{submission.createdAt}</Typography>
                        </TableCell>
                        <TableCell>{submission.language}</TableCell>
                        <TableCell>{submission.runtime} ms</TableCell>
                        <TableCell>{submission.memory} MB</TableCell>
                        <TableCell>{/* Add notes logic if available */}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body1">No submissions yet.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default SubmissionScreen;
