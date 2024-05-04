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
    return new Date(numbers).toLocaleDateString();
  };
  debugger;

  return (
    <Link className="btn btn-secondary border-0" to={'/posts/' + post.id}>
      <div className="topic-item__1Asc">
        <div className="topic-info__tdz0">
          <Avatar size="lg" name={post.user.fullName} src={post.user.urlImage} />
        </div>
        <div className="topic-title-wrapper__27Nt">
          <div className="item-header__2w29">
            <a className="title-link__1ay5" href="/discuss/interview-question/5042799/Atlassian-Offer-Revoked">
              <div className="title-container__1c9x">
                <div className="topic-title__3LYM">{post.topic}</div>
              </div>
            </a>
          </div>
          <div className="topic-info__tdz0">
            <span>
              <span>
                <span className="topic-info__tdz0">{post.user.fullName}</span> created at: {printDate(post.startDate)} |
              </span>
              <span>
                Last Reply:{' '}
                <a href="/dracky" target="_blank" className="topic-info__tdz0">
                  dracky
                </a>{' '}
                <a
                  className="topic-info__tdz0"
                  href="/discuss/interview-question/5042799/Atlassian-Offer-Revoked/2359031"
                >
                  44 minutes ago
                </a>
              </span>
            </span>
          </div>
        </div>
        <div className="wrapper__Fm3q">
          <div className="icon-wrapper__3uKf">
            <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2 icon__3CsQ">
              <path fillRule="evenodd" d="M2 17L12 7l10 10z"></path>
            </svg>
            <div className="no__1erK">49</div>
          </div>
          <div className="icon-wrapper__3uKf">
            <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2 icon__3CsQ">
              <path
                fillRule="evenodd"
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              ></path>
            </svg>
            <div className="no__1erK">2.5K</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
