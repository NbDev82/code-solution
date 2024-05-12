import React, { useEffect, useState, useMemo } from 'react';
import AddPost from '../../components/AddPost/AddPost';
import { getCurrentUserDetail } from '~/auth';
import { loadPostUserWise } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import PostUser from '~/components/Post/PostUser';
import Button from '~/components/Buttons/Button';
import { useCallback } from 'react';
import styles from '../Discuss/DiscussPage.module.scss';
import MainNavbar from '~/components/Navbars/MainNavbar';
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const handleAddPost = useCallback(() => {
    setShowAddPost(true);
  }, []);
  const handleClosePage = () => {
    setShowAddPost(false);
  };
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: 5,
    totalElements: 5,
    pageSize: '',
    lastPage: false,
    pageNumber: '',
  });

  useEffect(() => {
    setUser(getCurrentUserDetail);
    changePage();
  }, []);

  const showPost = useMemo(() => {
    return posts.map((post, index) => <PostUser post={post} deletePost={1} key={index} />);
  }, [posts]);
  const changePage = async () => {
    try {
      const data = await loadPostUserWise(getCurrentUserDetail().id);

      setPosts([...data]);
    } catch (error) {
      toast.error('Error in loading posts');
    }
  };
  return (
    <div className="css-0">
      <div>
        <div>
          <MainNavbar />
        </div>

        <div className={styles.container}>
          <div className={styles['content-wrapper-display']}>
            <div className={styles['left-pane']}>
              <div className={styles['rounded-topic-list-wrapper']}>
                <div className={styles['topic-list-content']}>
                  <div className={styles['border-wrapper']}>
                    <div className={styles['subheader']}>
                      <div className={styles['subheader-left']}></div>
                      <span className={styles['search-input-wrapper']}>
                        <input className={styles['search-input']} placeholder="Search topics ..." value="" />
                      </span>
                      <div>
                        {showAddPost ? (
                          <div>
                            <AddPost />
                            <button className={styles['btn']} data-no-border="true" onClick={handleClosePage}>
                              <div className={styles['btn-content-container']}>
                                Close
                                <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                                  <path d="M8 4h8v2H8zM8 8h8v2H8zM8 12h8v2H8z" fill="currentColor" />
                                </svg>
                              </div>
                            </button>
                          </div>
                        ) : (
                          <button className={styles['btn']} data-no-border="true" onClick={handleAddPost}>
                            <div className={styles['btn-content-container']}>
                              <span className={styles['new-text']}>New</span>
                              <svg viewBox="0 0 24 24" width="1em" height="1em" className={styles['icon']}>
                                <path fillRule="evenodd" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                              </svg>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="showPost">{showPost}</div>
                </div>
                <div className={`${styles.pagination}`}>
                  <Pagination>
                    <PaginationItem
                      onClick={() => changePage(postContent.pageNumber - 1)}
                      disabled={postContent.pageNumber === 0}
                    >
                      <PaginationLink previous>Previous</PaginationLink>
                    </PaginationItem>

                    {[...Array(postContent.totalPages)].map((item, index) => (
                      <PaginationItem
                        onClick={() => changePage(index)}
                        active={index === postContent.pageNumber}
                        key={index}
                      >
                        <PaginationLink>{index + 1}</PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem
                      onClick={() => changePage(postContent.pageNumber + 1)}
                      disabled={postContent.lastPage}
                    >
                      <PaginationLink next>Next</PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>{' '}
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
