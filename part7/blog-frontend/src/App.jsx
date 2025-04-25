import { useState, useRef, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch } from 'react-redux'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [newBlogAdded, SetnewBlogAdded] = useState(false);
  const [newLike, setNewLike] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const compareFn = (a, b) => (a.likes > b.likes ? -1 : 0);
      blogs.sort(compareFn);
      setBlogs(blogs);
    });
  }, [newBlogAdded, newLike]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const sortBlogs = (blogs) => {
    const compareFn = (a, b) => (a.likes > b.likes ? -1 : 0);
    blogs.sort(compareFn);
    setBlogs([...blogs]);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            errorMessage={errorMessage}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const createBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.createBlog({ title, author, url });
    console.log("blog", blog);
    // setSuccessMessage(`a new blog ${blog.title} added!`);
    dispatch(notify(`A new blog "${blog.title}" added!`, 'success', 3))

    setBlogs([...blogs, blog]);
    SetnewBlogAdded(!newBlogAdded);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(notify('Wrong username or password', 'error', 3))
      console.log("error", error);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    console.log("Blogs:", blogs);
  }, [blogs]);

  const handleDeleteBlog = async (event, blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
        const response = await blogService.deleteBlog(blog.id);
        setBlogs((blogs) =>
          blogs.filter((blogItem) => blogItem.id !== blog.id),
        );
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {successMessage !== null ? (
            <Notification successMessage={successMessage} />
          ) : (
            false
          )}
          <p>
            {user.username} logged-in{" "}
            <button type="submit" onClick={logout}>
              logout
            </button>
          </p>

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
              url={url}
              title={title}
              author={author}
              setAuthor={setAuthor}
              setTitle={setTitle}
              setUrl={setUrl}
              newBlog={SetnewBlogAdded}
            />
          </Togglable>

          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              handleDeleteBlog={handleDeleteBlog}
              newLike={setNewLike}
              blogs={blogs}
              sortBlogs={sortBlogs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;