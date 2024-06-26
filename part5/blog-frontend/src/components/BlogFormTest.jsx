import { useState } from 'react'

const BlogForm = ({ createBlog , title, author, url , setUrl, setTitle, setAuthor }) => {
  const [newBlog, setNewBlog] = useState('')

  const handleChange = (event) => {
    setNewBlog(event.target.value)
  }

  const createBlogForm = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
    })

    setNewBlog('')
  }

  return(
    <form onSubmit={createBlogForm}>
      <div>
        <h1>Create new </h1>
    title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
          placeholder='title'
        />
      </div>
      <div>
    author:
        <input
          type="text"
          value={author}
          name="Password"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
    url:
        <input
          type="text"
          value={url}
          name="Password"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )}

export default BlogForm