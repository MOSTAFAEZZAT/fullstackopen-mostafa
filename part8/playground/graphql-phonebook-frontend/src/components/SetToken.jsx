const App = () => {
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const result = useQuery(ALL_PERSONS)
  
    const client = useApolloClient()
  
    if (result.loading)  {
      return <div>loading...</div>
    }
  
  
    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }
  
  
    if (!token) {
      return (
        <>
          <Notify errorMessage={errorMessage} />
          <LoginForm setToken={setToken} setError={notify} />
        </>
      )
    }
  
    return (
      <>
        <Notify errorMessage={errorMessage} />
  
        <button onClick={logout}>logout</button>
        <Persons persons={result.data.allPersons} />
        <PersonForm setError={notify} />
        <PhoneForm setError={notify} />
      </>
    )
  }