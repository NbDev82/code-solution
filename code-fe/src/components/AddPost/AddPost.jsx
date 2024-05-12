import { useState } from 'react';
import { useEffect } from 'react';
import { Card, CardBody, Form, Input, Label, Button, Container } from 'reactstrap';
import { loadAllCategories } from '~/services/CatDiscussService';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { createPost as doCreatePost } from '~/services/DiscussService';
import { getCurrentUserDetail } from '~/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './AddPost.module.scss';
const AddPost = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    topic: '',
    content: '',
    categoryId: '',
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log('--------------------------------------');
    console.log(event.currentTarget.name);
    console.log(event.currentTarget.value);
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  //create post function
  const createPost = (event) => {
    event.preventDefault();

    // console.log(post)
    if (post.topic.trim() === '') {
      toast.error('post  title is required !!');
      return;
    }

    if (post.content.trim() === '') {
      toast.error('post content is required !!');
      return;
    }

    if (post.categoryId === '') {
      toast.error('select some category !!');
      return;
    }

    //submit the form one server
    post['userId'] = user.id;
    doCreatePost(post)
      .then((data) => {
        if (user.id != null) {
          navigate(`/user/${user.id}/posts`, { state: {}, replace: false });
        }
        window.location.reload();

        toast.success('Post Created !!');
      })
      .catch((error) => {
        toast.error('Post not created due to some error !!');
      });
  };

  //handling file chagne event
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  return (
    <div className={styles['page-drawer-base']} data-appear="true" data-fullscreen="false" style={{ height: '50%' }}>
      <div className={styles['content-container']}>
        <div className={styles['topic-editor-base']}>
          <form onSubmit={createPost}>
            <div className={styles['editor-content']}>
              <div className={styles['editor-header']}>
                <div className={styles['editor-header-left']}>
                  <span style={{ width: '100%' }}>
                    <input
                      className={styles.input}
                      type="text"
                      id="topic"
                      placeholder="Enter topic title..."
                      name="topic"
                      onChange={fieldChanged}
                    />
                  </span>
                </div>
                <div className={styles['editor-header-tool']}>
                  <div className={styles['header-right']}>
                    <button
                      className={`${styles.btn} ${styles['fancy-btn']} ${styles.primary} ${styles.light} ${styles['btn-md']} `}
                      data-no-border="true"
                      type="submit"
                    >
                      <div className={styles['btn-content-container']}>
                        <span>Post</span>
                        <svg viewBox="0 0 24 24" width="1em" height="1em" className={styles.icon}>
                          <path
                            fillRule="evenodd"
                            d="M20.901 3.741l-9.582 17.697-4.015-5.734 7.684-7.822-9.881 4.798-3.619-4.706z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`my-3 ${styles['category-container']}`}>
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="categoryId"
                  placeholder="Enter here"
                  className={`${styles.input} ${styles.rounded}`}
                  name="categoryId"
                  onChange={fieldChanged}
                  defaultValue={0}
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
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanged(newContent)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
