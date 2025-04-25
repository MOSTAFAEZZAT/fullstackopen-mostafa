import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const title = useField('text')  
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  // Destructure reset to avoid passing it to <input />
  const { reset: resetTitle, ...titleInput } = title
  const { reset: resetAuthor, ...authorInput } = author
  const { reset: resetInfo, ...infoInput } = info

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: title.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    // clear all inputs
    resetTitle()
    resetAuthor()
    resetInfo()

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        content
        <input {...titleInput} />
      </div>
      <div>
        author
        <input {...authorInput} />
      </div>
      <div>
        url for more info
        <input {...infoInput} />
      </div>
      <button type="submit">create</button>
      <button
        type="button"
        onClick={() => {
          resetTitle()
          resetAuthor()
          resetInfo()
        }}
      >
        reset
      </button>
    </form>
  )
}

export default CreateNew
