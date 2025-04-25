const BlogForm = ({
  createBlog,
  title,
  author,
  url,
  setUrl,
  setTitle,
  setAuthor,
}) => (
  <form onSubmit={createBlog}>
    <div>
      <h1>Create new </h1>
      title:
      <input
        data-testid="titleInput"
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
      <input
        data-testid="authorInput"
        type="text"
        value={author}
        name="Password"
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:
      <input
        data-testid="urlInput"
        type="text"
        value={url}
        name="Password"
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
);

export default BlogForm;
