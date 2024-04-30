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
const AddPost = () => {
  const editor = useRef(null);
  // const [content,setContent] =useState('')
  debugger;
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    topic: '',
    content: '',
    categoryId: '',
  });

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
                    {/* <label class="checkbox__3T7Q toggle-anonymous__1TS4">
                    <svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2 checkbox-icon__32ov">
                      <path
                        fill-rule="evenodd"
                        d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                      ></path>
                    </svg>
                    <span class="checkbox-text__3_GF">
                      <div class="anonymous-label-short__1kI9">Anonymous</div>
                      <div class="anonymous-label-long__6jo8">Appear as anonymous to other users</div>
                    </span>
                  </label> */}

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
              {/* <div class="tag-line__2Ead">
              <div class="tags-input__28oa">
                <div class="Select css-ti4mbd is-clearable is-searchable Select--multi" style={{ zIndex: '1' }}>
                  {' '}
                  <div class="Select-control">
                    <span class="Select-multi-value-wrapper" id="react-select-2--value">
                      <div class="Select-placeholder">Tag your topic (e.g. 'facebook', 'binary-search...')</div>
                      <div class="Select-input" style={{ display: 'inline-block' }}>
                        <input
                          aria-activedescendant="react-select-2--value"
                          aria-expanded="false"
                          aria-haspopup="false"
                          aria-owns=""
                          role="combobox"
                          value=""
                          style={{ boxSizing: 'content-box', width: '5px' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            visibility: 'hidden',
                            height: '0px',
                            overflow: 'scroll',
                            whiteSpace: 'pre',
                            fontSize: '14px',
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: '400',
                            fontStyle: 'normal',
                            letterSpacing: 'normal',
                            textTransform: 'none',
                          }}
                        ></div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
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
