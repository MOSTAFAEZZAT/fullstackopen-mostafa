import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom';
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

const App = () => {

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/authors">authors</Link>
          <Link style={padding} to="/books">books</Link>
          <Link style={padding} to="/add">add book</Link>
        </div>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books   />} />
          <Route path="/add" element={<NewBook  />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
