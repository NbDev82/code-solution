import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import userContext from '~/context/userContext';
import { getCurrentUserDetail, isLoggedIn } from '~/auth';
import './Post.scss';
import { Box, Text, Flex } from '@chakra-ui/react';
import { Container } from 'reactstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Avatar } from '@chakra-ui/react';

function Post({ post, deletePost }) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  const printDate = (numbers) => {
    const date = new Date(numbers);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate.replace('at', '');
  };

  return (
    <Link style={{ width: '70%' }} to={'/posts/' + post.id}>
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
                <span className="topic-info__left-margin">{post.user.fullName}</span>{' '}
                <span style={{ opacity: 0.5, marginLeft: '2%', marginRight: '1%' }}>Update At:</span>{' '}
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
      </div>
    </Link>
  );
}

export default Post;
