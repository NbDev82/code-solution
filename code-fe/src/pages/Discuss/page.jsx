import './page.scss';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useEffect, useContext, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
export default function Page() {
  const editor = useRef(null);
  // const [content,setContent] =useState('')

  debugger;
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const contentFieldChanged = (data) => {
    debugger;

    setPost({ ...post, content: data });
  };
  // const handleAddPost = () => {
  //   setShowAddPost(true);
  // };
  const [post, setPost] = useState({
    topic: '',
    content: '',
    categoryId: '',
  });

  return (
    <div className="wrapper">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>What going in your mind ?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="topic">Post title</Label>
              <Input
                type="text"
                id="topic"
                placeholder="Enter here"
                className="rounded-0"
                name="topic"
                onChange={fieldChanged}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>

              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanged(newContent)}
              />
            </div>

            {/* file field  */}

            <div className="mt-3">
              <Label for="image">Select Post banner</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
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

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
