import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({

});

const CommentEditText = () => {
    const [comment, setComment] = React.useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const isCommentDisabled = comment.trim() === '';

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ color: '#ffffff', fontSize: 34, fontWeight: 'medium' }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Type comment here..."
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <Button variant="contained"
                        sx={{margin: 1}}>
                    Preview
                </Button>
                <Button variant="contained"
                        sx={{margin: 1}}
                        disabled={ isCommentDisabled }>
                    Comment
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default CommentEditText;
