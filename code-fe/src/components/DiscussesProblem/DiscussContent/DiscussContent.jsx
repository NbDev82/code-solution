import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CommentEditText from '~/components/DiscussesProblem/CommentEditText/CommentEditText';
export default function DiscussContent() {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const toggleReply = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Newbie here. Finally a daily question that has already solved by me. Feels good lol
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          by rhythm31 - Feb 20, 2024
        </Typography>
        <Typography variant="body2">
          This component utilizes Material UI's Card component to create a visually appealing card with a heading,
          subheading, and body text.
        </Typography>
        <Button variant="contained" onClick={toggleReply}>
          Reply
        </Button>

        {isReplyOpen && <CommentEditText />}
      </CardContent>
    </Card>
  );
}
