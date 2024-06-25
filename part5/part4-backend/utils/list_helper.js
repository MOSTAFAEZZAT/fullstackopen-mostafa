const dummy = (blogs) => {
  let num = blogs
  num = 1
  return num
}

const totalLikes = (blog) => {
  const result = blog.reduce((i, item) => item.likes, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((previous, item) => {
    return previous.likes > item.likes ? previous : item
  }, {})
  const { title , author, likes } = result
  return { title , author, likes }
}

const mostBlogs = (blogs) => {
  const authorCounts = {}
  blogs.map((blog) => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1
  })

  let maxAuthor = null
  let maxBlogs = 0
  Object.keys(authorCounts).map((author) => {
    if (authorCounts[author] > maxBlogs) {
      maxAuthor = author
      maxBlogs = authorCounts[author]
    }
  })

  return { author: maxAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  const authorCounts = {}
  blogs.map((blog) => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + blog.likes
  })
  console.log(authorCounts)
  let maxAuthor = null
  let maxLikes = 0
  Object.keys(authorCounts).map((author) => {
    if (authorCounts[author] > maxLikes) {
      maxAuthor = author
      maxLikes = authorCounts[author]
    }
  })

  return { author: maxAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}