import { useEffect, useState } from 'react'
import blogService from  '../services/blogs'

const Blog = ({ blog, user, blogs, handleDeleteBlog, newLike, sortBlogs }) => {

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
  const [likes,  setLikes]= useState(blog.likes ? blog.likes : 0 )
     
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setName(user.username)
    }
  }, [])

  const toggelBlog = () => {
    loginVisible === true ? setLoginVisible(false) : setLoginVisible(true)
    toggleButton === 'view' ? setToggleButton('hide') : setToggleButton('view')
  }

  const handleLikes = async (blog) => {
    blog.likes = blog.likes + 1
    try {
      const response = await blogService.updateLikes(blog.id, blog)
      newLike(true)
      setLikes( blog.likes)
      sortBlogs(blogs) // Trigger re-sort after like update

    } catch (error) {
      console.error('Error updating likes:', error)
      // Handle error if necessary
    }

  }

  console.log( 'test' , user.username ,  name.username)
  return (

    <div style={blogStyle}>
      <div className='blogs' style={inlineStyle}>
        {blog.title} {blog.author}
        <div>
          <button onClick={toggelBlog}>{toggleButton}</button>
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
          likes: <span title='likes' id='likes'>{likes}</span> <button onClick={() => handleLikes(blog)}>like</button>
        </div>
        <div>
          user: { blog.user.name }
        </div>
        <div>
          {blog.user.username === name ? <button data-testid="removeButton"  name="remove"  className='removeButton' style={buttonStyle} onClick={() => handleDeleteBlog(event,blog)}>remove</button> : null}
        </div>
      </div>
    </div>
  )
}

export default Blog