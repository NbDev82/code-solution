import JoditEditor from 'jodit-react';
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userContext from '~/context/userContext';
import { loadPost, updatePost as doUpdatePost } from '~/services/DiscussService';
import { loadAllCategories } from '~/services/CatDiscussService';
import { Card, CardBody, Form, Input, Label, Button, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import MainNavbar from '~/components/Navbars/MainNavbar';
import styles from './UpdatePost.module.scss';

function UpdatePost() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);

  const { postId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //load the blog from database
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error('error in loading the blog');
      });
  }, []);
  //   useEffect(() => {
  //     console.log('first');
  //     if (post) {
  //       if (post.user.id != object.user.data.id) {
  //         toast.error('This is not your post !!');
  //         navigate('/');
  //       }
  //     }
  //   }, [post]);
  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };
  const handleBackClick = () => {
    window.history.back();
  };
  const updatePost = (event) => {
    event.preventDefault();
    console.log(post);
    doUpdatePost({ ...post, category: { categoryId: post.categoryId } }, postId)
      .then((res) => {
        toast.success('Post updated');
        navigate(`/user/${res.user.id}/posts`, { state: {}, replace: false });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in upading post');
      });
  };
  const updateHtml = () => {
    debugger;
    return (
      <div className={`${styles.wrapper}`}>
        <Card className={`${styles.card}`}>
          <CardBody>
            <h3>Update post from here !!</h3>
            <div style={{ marginRight: '16px', position: 'relative' }}>
              <a style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }} onClick={handleBackClick}>
                <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                  <path fill-rule="evenodd" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                </svg>
                <span>Back</span>
              </a>
            </div>
            <Form onSubmit={updatePost} className={styles['form-group']}>
              <div className={`${styles.row}`}>
                <Label className={`${styles.label}`} for="topic">
                  Post topic
                </Label>
                <Input
                  type="text"
                  id="topic"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="topic"
                  value={post.topic}
                  onChange={(event) => handleChange(event, 'topic')}
                  style={{ width: '100%' }}
                />
              </div>

              <div className="my-3">
                <Label for="content">Post Content</Label>
                {/* <Input
                            type="textarea"
                            id="content"
                            placeholder="Enter here"
                            className="rounded-0"
                            style={{ height: '300px' }}
                        /> */}

                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={(newContent) => setPost({ ...post, content: newContent })}
                />
              </div>

              {/* file field  */}

              <div className={`${styles.line}`}>
                <Label className={`${styles.label}`} for="image">
                  Select Post banner
                </Label>
                <Input id="image" type="file" onChange={''} />
              </div>

              <div className={`${styles.line}`}>
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="categoryId"
                  onChange={(event) => handleChange(event, 'categoryId')}
                  value={post.category.categoryId}
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>

                  {categories.map((category) => (
                    <option value={category.categoryId} key={category.categoryId}>
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" className={`${styles.button}`}>
                  Update Post
                </Button>
                <Button className={`${styles.button} ${styles.customBtn}`}>Reset Content</Button>{' '}
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };
  return (
    <div>
      <MainNavbar />

      <div style={{ width: '70%', alignContent: 'center', margin: '0 auto', marginTop: '20px' }}>
        <Container>{post && updateHtml()}</Container>
      </div>
    </div>
  );
}
export default UpdatePost;
