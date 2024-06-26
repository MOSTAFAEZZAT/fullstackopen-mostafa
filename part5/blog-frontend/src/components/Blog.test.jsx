import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './BlogTest'
import Togglable from './Togglable'
import BlogForm from './BlogFormTest'

const blog = {
  title: 'Testing Blog with Vitest',
  author: 'Mostafa',
  user: 'mostafa',
  likes: 10,
  url: 'http://localhost:5173'
}

describe('test Blog', () => {

  test('5.13: Blog List Tests, step 1', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blogs')
    expect(div).toHaveTextContent('Testing Blog with Vitest')
  })

  test('5.15: Blog List Tests, step 3', async () => {
    const LikeBlogButton = vi.fn() // Mock the LikeBlogButton function

    render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          <Blog blog={blog} LikeBlogButton={LikeBlogButton} />
        </div>
      </Togglable>
    )

    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const likeBlog = screen.getByText('LikeBlog')
    await user.click(likeBlog)
    await user.click(likeBlog)
    expect(LikeBlogButton.mock.calls).toHaveLength(2)
  })

  test('5.16: Blog List Tests, step 4 ', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
    render(<BlogForm createBlog={createBlog} />)
    const input = screen.queryByPlaceholderText('title')
    const sendButton = screen.getByText('create')
    await user.type(input, 'testing a blog...')
    await user.click(sendButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a blog...')
  })
})
