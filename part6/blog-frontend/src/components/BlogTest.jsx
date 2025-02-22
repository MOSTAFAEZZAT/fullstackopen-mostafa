import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleDeleteBlog,  LikeBlogButton }) => {

  const blogStyle = {
    display: 'block',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const inlineStyle = { display: 'inline-flex' }
  const buttonStyle = { color: 'black', background: '#005DFF', borderRadius: '5px' }
  const [loginVisible, setLoginVisible] = useState(false)
  const [toggleButton, setToggleButton] = useState('view')
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const [name, setName] = useState('')
  useEffect(() => {
    const storedName = JSON.parse(localStorage.getItem('loggedBlogappUser'))

    if (storedName) {
      setName(storedName)
    }
  }, [])

  const toggelBlog = () => {
    loginVisible === true ? setLoginVisible(false) : setLoginVisible(true)
    toggleButton === 'view' ? setToggleButton('hide') : setToggleButton('view')
  }

  const handleLikes = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await blogService.updateLikes(blog.id, updatedBlog)
  }

  return (

    <div style={blogStyle}>

      <div className='blogs' style={inlineStyle}>
        {blog.title} {blog.author}
        <div>
          <button onClick={toggelBlog  }>{toggleButton}</button>
        </div>
      </div>

      <div style={showWhenVisible}>
        <div >
          title: {blog.title}
        </div>
        <div >
          url: {blog.url}
        </div>
        <div>
          <p  className='likeBlog'>likes: {blog.likes}</p>  <button onClick={ handleLikes(blog)}>like</button>
          likes: {blog.likes} <button className='likeBlog' onClick={ () => LikeBlogButton(blog)}>LikeBlog</button>

        </div>
        <div>
          user: {blog.user.name}
        </div>
        <div>
          {blog.user.username === name.username ? <button style={buttonStyle} onClick={() => handleDeleteBlog(blog)}>remove</button> : ''}
        </div>
      </div>
    </div>
  )
}

export default Blog