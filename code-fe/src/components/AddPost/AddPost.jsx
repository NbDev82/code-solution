import { useState } from 'react';
import { useEffect } from 'react';
import { Card, CardBody, Form, Input, Label, Button, Container } from 'reactstrap';
import { loadAllCategories } from '~/services/CatDiscussService';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { createPost as doCreatePost } from '~/services/DiscussService';
import { getCurrentUserDetail } from '~/auth';
import { toast } from 'react-toastify';
import './AddPost.scss';
import { useNavigate } from 'react-router-dom';
const AddPost = () => {
  const editor = useRef(null);
  debugger;
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    topic: '',
    content: '',
    categoryId: '',
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  // const config={
  //     placeholder:"Start typing...",

  // }

  useEffect(() => {
    debugger;

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

  //field changed function
  const fieldChanged = (event) => {
    // console.log(event)
    debugger;
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log('--------------------------------------');
    console.log(event.currentTarget.name);
    console.log(event.currentTarget.value);
  };

  const contentFieldChanged = (data) => {
    debugger;

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
    debugger;
    post['userId'] = user.id;
    doCreatePost(post)
      .then((data) => {
        debugger;
        if (user.id != null) {
          navigate(`/user/${user.id}/posts`, { state: {}, replace: false });
        }
        window.location.reload();

        // uploadPostImage(image, data.id)
        //   .then((data) => {
        //     toast.success('Image Uploaded !!');
        //   })
        //   .catch((error) => {
        //     toast.error('Error in uploading image');
        //     console.log(error);
        //   });

        toast.success('Post Created !!');
        // console.log(post)
      })
      .catch((error) => {
        toast.error('Post not created due to some error !!');
        // console.log(error)
      });
  };

  //handling file chagne event
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  return (
    <div
      class="page-drawer-base page-drawer-base__-zHW"
      data-appear="true"
      data-fullscreen="false"
      style={{ height: '50%' }}
    >
      <div class="content-container">
        <div class="topic-editor-base">
          <form onSubmit={createPost}>
            <div class="editor-content editor-content__zQ7F">
              <div class="editor-header__3sIw">
                <div class="editor-header-left__RLbD">
                  <span class="wrapper__3jgl md__3TJb title-input__2sXm">
                    <input
                      class="input__2o8B "
                      type="text"
                      id="topic"
                      placeholder="Enter topic title..."
                      name="topic"
                      onChange={fieldChanged}
                    />
                  </span>
                </div>
                <div class="editor-header-tool__2QB-">
                  <div class="header-right__2UzF">
                    <button
                      class="btn__3Y3g fancy-btn__2prB primary__lqsj light__3AfA btn__1z2CC btn-md__M51O"
                      data-no-border="true"
                      type="submit"
                    >
                      <div class="btn-content-container__2HVS">
                        <span>Post</span>
                        <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2">
                          <path
                            fill-rule="evenodd"
                            d="M20.901 3.741l-9.582 17.697-4.015-5.734 7.684-7.822-9.881 4.798-3.619-4.706z"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="categoryId"
                  placeholder="Enter here"
                  className="rounded-0"
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
              />{' '}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
