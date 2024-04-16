import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

const PostPage = ({ post }) => {
  const [comment, setComment] = useState({ text: '' });
  const [expandedComments, setExpandedComments] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const BASE_URL = '';
  const theme = useTheme();
  const handleReadMore = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  const handleReply = (commentId) => {
    setShowReplyForm(true);
    setReplyingTo(commentId);
  };

  const handleReplySubmit = (reply) => {
    // Handle reply submission logic
    setShowReplyForm(false);
    setReplyingTo(null);
  };

  const submitPost = () => {
    // Handle post submission logic
  };

  const printDate = (dateTime) => {
    // Format and print the date
  };

  const ReplyForm = ({ onSubmit }) => {
    const [reply, setReply] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(reply);
      setReply('');
    };

    return <div></div>;
  };

  return <Container></Container>;
};

export default PostPage;
