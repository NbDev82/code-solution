import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '~/context/userContext';
import { getCurrentUserDetail, isLoggedIn } from '~/auth';
import './Post.scss';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { Container } from 'reactstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Avatar } from '@chakra-ui/react';
import { deletePostService } from '~/services/DiscussService';
function PostUser({ post, deletePost }) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };
  const handleUpdate = (postId) => {
    // Handle the update action for the post with the specified postId
    window.location.href = `/user/update-post/${postId}`;
  };
  const handleDelete = (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      deletePostService(postId)
        .then((data) => {
          if (data === 'Success') {
            // Xóa thành công, tải lại trang
            window.location.reload();
          } else {
            // Xử lý lỗi khi xóa bài viết
            console.log('Lỗi khi xóa bài viết');
          }
        })
        .catch((error) => {
          // Xử lý lỗi xóa bài viết
          console.log('Lỗi khi xóa bài viết', error);
        });
    }
  };
  debugger;

  const handleButtonClick = (event, postId) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the Link element
    if (event.target.name === 'update') {
      handleUpdate(postId);
    } else if (event.target.name === 'delete') {
      handleDelete(postId);
    }
  };

  return (
    <div>
      <div className="topic-item-wrap__border topic-item__container">
        <div className="topic-info__left-margin">
          <Avatar className="avatar__size" name={post.user.fullName} src={post.user.urlImage} />
        </div>
        <div className="topic-title-wrapper__flex">
          <div className="item-header__flex">
            <a className="title-link__font" href="/discuss/interview-question/5042799/Atlassian-Offer-Revoked">
              <div className="title-container__1c9x">
                <Link to={'/posts/' + post.id}>
                  <div className="topic-title__3LYM">{post.topic}</div>
                </Link>
              </div>
            </a>
            <button className="btn-category">{post.category.categoryTitle}</button>
          </div>
          <div className="topic-info__left-margin">
            <span>
              <span>
                <span className="topic-info__left-margin">{post.user.fullName}</span> created at:{' '}
                {printDate(post.startDate)}
              </span>
            </span>
          </div>
        </div>
        <div className="icon-wrapper__flex">
          <div className="icon-wrapper__left-margin">
            <RemoveRedEyeIcon />
          </div>
          <div className="icon-wrapper__left-margin">
            <Text>{post.views}</Text>
          </div>
        </div>
        {login && user?.id === post.user.id && (
          <div style={{ marginTop: '10px' }}>
            <Button
              className="custom-button"
              colorScheme="blue"
              size="sm"
              name="update"
              onClick={(event) => handleButtonClick(event, post.id)}
            >
              Update
            </Button>
            <Button
              className="custom-button"
              size="sm"
              name="delete"
              onClick={(event) => handleButtonClick(event, post.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostUser;
