import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AddPost from '../../components/AddPost';
import UserDashboard from '../User/UserDashboard';
import { loadPost } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import { Button, Badge, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap';
import styles from './PostPage.module.scss';
import { colors } from '@mui/material';
import { Avatar } from '@chakra-ui/react';
import CardComment from '~/components/BlogComment/CardComment';
import MainNavbar from '~/components/Navbars/MainNavbar';
import PostComment from '~/components/BlogComment/PostComment';
const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const handleBackClick = () => {
    window.history.back();
  };
  const [comment, setComment] = useState({ text: '' });
  const [expandedComments, setExpandedComments] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
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

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
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
  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        toast.error('Error is loading Post');
      });
  }, [postId]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <MainNavbar />

      <Container className={`${styles.container}`}>
        {post && (
          <Link to="/" className={styles.title}>
            {post.topic}
          </Link>
        )}
        <div style={{ marginRight: '16px', position: 'relative' }}>
          <a style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }} onClick={handleBackClick}>
            <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
              <path fill-rule="evenodd" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
            <span>Back</span>
          </a>
        </div>
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="card">
              {post && (
                <CardBody>
                  <Container>
                    <Row className={styles.root}>
                      <Col xs="auto">
                        <a href="/Sithis" target="_blank" className={styles.a}>
                          <Avatar size="lg" name={post.user.fullName} src={post.user.urlImage} />
                        </a>
                      </Col>
                      <Col>
                        <div>
                          <div className={styles.userinfo}>
                            <span className={styles.name}>
                              <a href="/Sithis" target="_blank" className="link__Lpjq">
                                Sithis
                              </a>
                            </span>
                            <Badge>
                              <img
                                src="https://assets.leetcode.com/static_assets/marketing/lg50.png"
                                style={{
                                  width: '14px',
                                  height: '14px',
                                }}
                              />
                            </Badge>
                            <span
                              style={{ color: '#90a4ae', marginLeft: '10px', display: 'flex', alignItems: 'center' }}
                            >
                              {' '}
                              <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2">
                                <path
                                  fillRule="evenodd"
                                  d="M13.133 14.065C15.941 14.363 20 15.68 20 18v2H4v-2c0-2.321 4.059-3.637 6.867-3.935L10.5 17l1.5 1 1.5-1-.367-2.935zM12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                                ></path>
                              </svg>
                              {post.user.fullName}{' '}
                            </span>
                            <span
                              style={{ color: '#90a4ae', marginLeft: '20px', display: 'flex', alignItems: 'center' }}
                            >
                              <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2">
                                <path
                                  fillRule="evenodd"
                                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                ></path>
                              </svg>
                              23307
                            </span>
                          </div>
                          <div
                            style={{
                              color: '#bdbdbd',
                              flex: '1',
                              display: 'inline-flex',
                              alignItems: 'center',
                              marginLeft: '25px',
                            }}
                          >
                            <p>Created At : {printDate(post.startDate)}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <CardText style={{ boxSizing: 'border-box' }}>
                    <span>{post.category.categoryTitle}</span>
                  </CardText>
                  <div
                    className="divder"
                    style={{
                      width: '100%',
                      height: '1px',
                      background: '#e2e2e2',
                    }}
                  ></div>
                  {/* <CardText className="mt-3">
                    <h1>{post.topic}</h1>
                  </CardText> */}
                  <div style={{ maxWidth: '50%' }}>
                    {/* <img className="img-fluid" src={`${BASE_URL}post/image/${post.image}`} alt="" /> */}
                  </div>
                  <CardText
                    style={{ paddingLeft: '10px' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>{' '}
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <div className="root">
          <Container>
            <PostComment />
          </Container>
          <Container>
            <CardComment postId={postId} />{' '}
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default PostPage;
