import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AddPost from '../../components/AddPost';
import UserDashboard from '../User/UserDashboard';
import { loadCommentByDiscuss, loadPost } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import { Button, Badge, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap';
import styles from './PostPage.module.scss';
import { colors } from '@mui/material';
import { Avatar } from '@chakra-ui/react';
import CardComment from '~/components/BlogComment/CardComment';
import MainNavbar from '~/components/Navbars/MainNavbar';
import PostComment from '~/components/BlogComment/PostComment';
import LoadAllComment from '~/components/BlogComment/LoadAllComment';
const PostPage = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const handleBackClick = () => {
    window.history.back();
  };
  const [comment, setComment] = useState({ text: '' });
  const [listComment, setListComment] = useState([]);

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
    const date = new Date(numbers);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate.replace('at', '');
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
  const loadAllComment = async () => {
    try {
      const commentData = await loadCommentByDiscuss(postId);
      setListComment(commentData);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPostData = async () => {
    try {
      const postData = await loadPost(postId);
      setPost(postData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadPostData();
      await loadAllComment();
    };

    fetchData();
  }, [postId]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <MainNavbar />
      <div>
        <Container className={`${styles.container}`} style={{ backgroundColor: 'transparent' }}>
          {post && (
            <Link to="/" className={styles.title}>
              {post.topic}
            </Link>
          )}
          <div style={{ marginRight: '16px', position: 'relative' }}>
            <a
              style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}
              onClick={handleBackClick}
            >
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
                                {post.user.id}
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
                    <CardText
                      style={{
                        boxSizing: 'border-box',
                        color: '#546e7a',
                        fontSize: '1em',
                        margin: '5px  5px',
                        fontWeight: 'bold',
                      }}
                    >
                      <span>Category: {post.category.categoryTitle}</span>
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
          <div style={{ margin: '15px 0', minWidth: '750px' }}>
            <div
              style={{
                borderRadius: '5px',
                backgroundColor: '#f2f2f2',
                padding: '20px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    marginRight: '10px',
                    color: '#555',
                    fontSize: '14px',
                  }}
                >
                  Comments: {listComment.length}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  style={{
                    fill: '#555',
                    marginRight: '5px',
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M8.995 22a.955.955 0 0 1-.704-.282.955.955 0 0 1-.282-.704V18.01H3.972c-.564 0-1.033-.195-1.409-.586A1.99 1.99 0 0 1 2 15.99V3.97c0-.563.188-1.032.563-1.408C2.94 2.188 3.408 2 3.972 2h16.056c.564 0 1.033.188 1.409.563.375.376.563.845.563 1.409V15.99a1.99 1.99 0 0 1-.563 1.432c-.376.39-.845.586-1.409.586h-6.103l-3.709 3.71c-.22.187-.454.281-.704.281h-.517zm.986-6.01v3.1l3.099-3.1h6.948V3.973H3.972V15.99h6.01zm-3.99-9.013h12.018v2.018H5.991V6.977zm0 4.037h9.014v1.972H5.99v-1.972z"
                  ></path>
                </svg>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label
                  style={{
                    marginBottom: '5px',
                    fontSize: '14px',
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      marginRight: '5px',
                    }}
                    checked
                  />
                  Best
                </label>
                <label
                  style={{
                    marginBottom: '5px',
                    fontSize: '14px',
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  Most Votes
                </label>
                <label
                  style={{
                    marginBottom: '5px',
                    fontSize: '14px',
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  Newest to Oldest
                </label>
                <label
                  style={{
                    marginBottom: '5px',
                    fontSize: '14px',
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  Oldest to Newest
                </label>
              </div>
            </div>
            <PostComment commentParentId={0} />
            <LoadAllComment listComment={listComment} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PostPage;
