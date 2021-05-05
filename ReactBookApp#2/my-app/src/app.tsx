import Header from "./components/dashboard/header";
import BookList from "./components/booklist";
import AddBook from "./components/addBook";
import Register from "./components/register"
import Login from "./components/login"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import BookDetails from "./components/bookDetails";
import { useEffect, useState } from "react";


interface Props {}

export default function App({}: Props) {
  const [token, setToken] = useState<any>(false)
  const [Bookid, setBookid] = useState(0);
  //const [Books, setBooks] = useState(getBooksFromStorage())
  const addListenerToRow = (id: any) => {
    setBookid(id);
  };
  const handleToken=(token:string)=>{
    setToken(token)
  }
  useEffect(() => {
    const token=localStorage.getItem("token")
    if(token)
    {
      setToken(token)
    }else
    setToken(false)
  })
  return (
    <div className="main-page">
      <Router>
        <Header tokenFlag={token}></Header>
        <Switch>
          <Route path="/addNewBook">
            <AddBook></AddBook>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/login">
            <Login handleToken={handleToken}></Login>
          </Route>
          <Route path="/book/:id">
            <BookDetails bookID={Bookid}></BookDetails>
          </Route>
          <Route exact path="/">
            <BookList
              handleClick={addListenerToRow}
            ></BookList>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
