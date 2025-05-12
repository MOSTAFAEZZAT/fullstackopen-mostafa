import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendation from "./components/Recommendation";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom';
import { useQuery, useSubscription, useMutation} from "@apollo/client";
import { BOOK_ADDED, BOOKS_QUERY } from "./queries";


const padding = {
  padding: "10px 15px",
  backgroundColor: "#007BFF",
  color: "white",
  margin: "5px",
  border: "none",
  borderRadius: "5px",
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-block",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
};

const linkHoverStyle = {
  backgroundColor: "#0056b3",
};

export function updateCache(cache, query, addedBook) {
  console.log('updateCache called with', addedBook.title);
  const uniqByTitle = (books) => {
    const seen = new Set();
    return books.filter(b => {
      if (seen.has(b.title)) return false;
      seen.add(b.title);
      return true;
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [favouriteGenre, setFavouriteGenre] = useState(null);

    useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
       const newBook = data.data.bookAdded
    notify({ message: `New book "${newBook.title}" added` })

      updateCache(client.cache, { query: BOOKS_QUERY }, newBook)

    }
  })


  const notify = ({ message }) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
   };  

  
    if (!token) {
      return (
        
        <Router>
        <div>

          <div>
          <Notify errorMessage={errorMessage} />
            <Link style={padding} to="/authors">authors</Link>
            <Link style={padding} to="/books">books</Link>
            <Link style={padding} to="/login">login</Link>

          </div>

          <Routes>
            <Route path="/authors" element={<Authors />} />
            <Route path="/books" element={<Books favouriteGenre={favouriteGenre}  />} />
            <Route path="/login" element={<LoginForm setError={notify}  setToken={setToken} setFavouriteGenre={setFavouriteGenre} />} />

          </Routes>
        </div>
      </Router>
      )
    }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/authors">authors</Link>
          <Link style={padding} to="/books">books</Link>
          <Link style={padding} to="/add">add book</Link>
          <Link style={padding} to="/recommend">recommend</Link>
          <Link style={padding} to="/logout">logout</Link>
        </div>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books   favouriteGenre={favouriteGenre}  />} />
          <Route path="/add" element={<NewBook  />} />
          <Route path="/recommend" element={<Recommendation favouriteGenre={favouriteGenre} />} />
          <Route path="/logout" element={<LoginForm  setError={notify} setToken={setToken} setFavouriteGenre={setFavouriteGenre}  />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
