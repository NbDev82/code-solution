import React, { useEffect, useState, useMemo } from 'react';
import AddPost from '../../components/AddPost/AddPost';
import { getCurrentUserDetail } from '~/auth';
import { loadPostUserWise } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import Post from '../../components/Post/Post';
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
    return posts.map((post, index) => <Post post={post} deletePost={1} key={index} />);
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
    // <div>
    //   <div>
    //     <MainNavbar />
    //   </div>
    //   <div>
    //     <div class="css-sjryrr-LeftPane e5i1odf3">
    //       <div class="e5i1odf0 css-1lnhj25-FullWrapper-RoundedTopicList e5i1odf1">
    //         <div class="topic-list-content__3Win">
    //           <div class="border-wrapper__A-w9">
    //             <div class="subheader__3zA6">
    //               <div class="subheader-left__2TSJ">
    //                 {/* <div class="css-4gtjqr-RadioWrapper e5i1odf1">
    //                   <label class="css-os8bm0">
    //                     <input type="checkbox" class="css-o6r3zy-Input e5i1odf0" checked="" />
    //                     Hot
    //                   </label>
    //                   <label class="css-92dq4s">
    //                     <input type="checkbox" class="css-o6r3zy-Input e5i1odf0" />
    //                     Newest to Oldest
    //                   </label>
    //                   <label class="css-92dq4s">
    //                     <input type="checkbox" class="css-o6r3zy-Input e5i1odf0" />
    //                     Most Votes
    //                   </label>
    //                 </div> */}
    //               </div>
    //               <span class="wrapper__3jgl xs__dBbq search-input__y6fj">
    //                 <input class="input__2o8B " placeholder="Search topics or comments..." value="" />
    //               </span>
    //               <div>
    //                 {showAddPost ? (
    //                   <div>
    //                     <AddPost />
    //                     <button
    //                       className="btn__3Y3g fancy-btn__2prB primary__lqsj light__3AfA btn__1z2C btn-xs__3fYh"
    //                       data-no-border="true"
    //                       onClick={handleClosePage}
    //                     >
    //                       <div className="btn-content-container__2HVS">
    //                         Close
    //                         <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2">
    //                           <path d="M8 4h8v2H8zM8 8h8v2H8zM8 12h8v2H8z" fill="currentColor" />
    //                         </svg>
    //                       </div>
    //                     </button>
    //                   </div>
    //                 ) : (
    //                   <button
    //                     className="btn__3Y3g fancy-btn__2prB primary__lqsj light__3AfA btn__1z2C btn-xs__3fYh"
    //                     data-no-border="true"
    //                     onClick={handleAddPost}
    //                   >
    //                     <div className="btn-content-container__2HVS">
    //                       New
    //                       <svg viewBox="0 0 24 24" width="1em" height="1em" className="icon__1Md2">
    //                         <path fillRule="evenodd" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
    //                       </svg>
    //                     </div>
    //                   </button>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             {posts.map((post, index) => (
    //               <Post post={post} deletePost={1} key={index} />
    //             ))}
    //           </div>

    //           <div class="pagination-wrapper__2Pmg">
    //             <div class="root__1bde">
    //               <ul class="ant-pagination" unselectable="unselectable">
    //                 <li title="Previous Page" class="ant-pagination-disabled ant-pagination-prev" aria-disabled="true">
    //                   <a class="ant-pagination-item-link"></a>
    //                 </li>
    //                 <li
    //                   title="1"
    //                   class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"
    //                   tabindex="0"
    //                 >
    //                   <a>1</a>
    //                 </li>
    //                 <li title="2" class="ant-pagination-item ant-pagination-item-2" tabindex="0">
    //                   <a>2</a>
    //                 </li>
    //                 <li title="3" class="ant-pagination-item ant-pagination-item-3" tabindex="0">
    //                   <a>3</a>
    //                 </li>
    //                 <li title="4" class="ant-pagination-item ant-pagination-item-4" tabindex="0">
    //                   <a>4</a>
    //                 </li>
    //                 <li
    //                   title="5"
    //                   class="ant-pagination-item ant-pagination-item-5 ant-pagination-item-before-jump-next"
    //                   tabindex="0"
    //                 >
    //                   <a>5</a>
    //                 </li>
    //                 <li title="Next 5 Pages" tabindex="0" class="ant-pagination-jump-next">
    //                   <a class="ant-pagination-item-link"></a>
    //                 </li>
    //                 <li title="1535" class="ant-pagination-item ant-pagination-item-1535" tabindex="0">
    //                   <a>1535</a>
    //                 </li>
    //                 <li title="Next Page" tabindex="0" class="ant-pagination-next" aria-disabled="false">
    //                   <a class="ant-pagination-item-link"></a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
