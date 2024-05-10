import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Row, Col, Pagination, PaginationItem, PaginationLink, Container, Button } from 'reactstrap';
import { loadAllPosts } from '~/services/DiscussService';
import { toast } from 'react-toastify';
import Post from '../../components/Post/Post';
import { useCallback } from 'react';
import MainNavbar from '~/components/Navbars/MainNavbar';
import AddPost from '../../components/AddPost/AddPost';
import styles from './DiscussPage.module.scss';
import { loadPostCategoryWise } from '~/services/DiscussService';
import { Box, Text, VStack, background } from '@chakra-ui/react';
import { loadAllCategories } from '~/services/CatDiscussService';
import { getCurrentUserDetail } from '~/auth';
import { searchDiscussByTitle } from '~/services/DiscussService';
import { Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const DiscussPage = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: 5,
    totalElements: 5,
    pageSize: '',
    lastPage: false,
    pageNumber: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const { categoryId } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const handleAddPost = useCallback(() => {
    setShowAddPost(true);
  }, []);
  const handleClosePage = () => {
    setShowAddPost(false);
  };
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchInputChange = (event) => {
    debugger;
    setSearchKeyword(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchKeyword.trim() !== '') {
      debugger;
      try {
        const data = await searchDiscussByTitle(searchKeyword);
        setPosts([...data]);
      } catch (error) {
        toast.error('Error in loading posts');
      }
    }
  };

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);
  useEffect(() => {
    debugger;
    changePage(0, 20, categoryId); // Gọi hàm `changePage` lần đầu tiên khi DiscussPage được tải
  }, [categoryId]);
  const showPost = useMemo(() => {
    return posts.map((post, index) => <Post post={post} deletePost={1} key={index} />);
  }, [posts]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, userData] = await Promise.all([loadAllCategories(), getCurrentUserDetail()]);
        setTags(categoriesData);
        setCategories(categoriesData);
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const changePage = async (pageNumber = 0, pageSize = 20, categoryId) => {
    setSelectedCategoryId(categoryId);

    try {
      let data;

      if (categoryId && categoryId !== undefined) {
        data = await loadPostCategoryWise(categoryId);
      } else {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
          return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
          return;
        }
        data = await loadAllPosts(pageNumber, pageSize);
      }

      setPosts([...data]);
    } catch (error) {
      toast.error('Error in loading posts');
    }
  };
  const changePageInfinite = () => {
    setCurrentPage(currentPage + 1);
  };
  const allTag = {
    categoryId: 'all',
    categoryTitle: 'All',
  };

  const updatedTags = [allTag, ...tags];
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
                      <button style={{ color: 'ButtonText' }} data-no-border="true" onClick={handleSearchSubmit}>
                        <div className={styles['btn-content-container']}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="15"
                            height="15"
                            className={styles['search-icon']}
                          >
                            <Icon as={SearchIcon} boxSize={6} />
                          </svg>
                        </div>
                      </button>
                      <span className={styles['search-input-wrapper']}>
                        <input
                          className={styles['search-input']}
                          placeholder="Search topics ..."
                          value={searchKeyword}
                          onChange={handleSearchInputChange}
                        />{' '}
                        {/* <button style={{ backgroundColor: 'red' }} onClick={handleSearchSubmit}>
                          Search
                        </button> */}
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
                  <div className={styles['left-pane']}>{showPost}</div>
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
            <div className={styles['right-pane']}>
              <Box bg="white" p={4} borderWidth="1px" borderRadius="md">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Tags
                </Text>
                <VStack spacing={2} align="stretch">
                  {updatedTags.map((tag) => (
                    <div key={tag.categoryId}>
                      {tag.categoryId === 'all' ? (
                        <Link
                          to="/discuss"
                          className={styles.CustomLink}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedTagId(tag.categoryId);
                            changePage(0, 20, tag.categoryId);
                          }}
                        >
                          <Box
                            borderWidth="1px"
                            borderRadius="md"
                            py={2}
                            px={4}
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Text fontWeight="medium" textAlign="center">
                              {tag.categoryTitle}
                            </Text>
                          </Box>
                        </Link>
                      ) : selectedTagId === tag.categoryId ? (
                        <Box
                          borderWidth="3px"
                          borderRadius="md"
                          py={2}
                          px={4}
                          display="flex"
                          justifyContent="space-between"
                          bg="lightgray"
                        >
                          <Text fontWeight="medium">{tag.categoryTitle}</Text>
                        </Box>
                      ) : (
                        <Link
                          to={`/discuss/category/${tag.categoryId}`}
                          className={styles.CustomLink}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedTagId(tag.categoryId);
                            changePage(0, 20, tag.categoryId);
                          }}
                        >
                          <Box
                            borderWidth="1px"
                            borderRadius="md"
                            py={2}
                            px={4}
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Text fontWeight="medium" textAlign="center">
                              {tag.categoryTitle}
                            </Text>
                          </Box>
                        </Link>
                      )}
                    </div>
                  ))}
                </VStack>
              </Box>
            </div>
          </div>{' '}
        </div>
      </div>
    </div>
  );
};
export default DiscussPage;
