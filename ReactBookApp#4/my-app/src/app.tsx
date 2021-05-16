import Header from "./components/dashboard/header";
import BookList from "./components/booklist";
import AddBook from "./components/addBook";
import Register from "./components/register";
import Login from "./components/login";
import { ContextProvider } from "./userContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookDetails from "./components/bookDetails";
import { useEffect, useState } from "react";
import Logout from "./components/logout"

interface Props {}

export default function App({}: Props) {
  const [token, setToken] = useState<any>(false);
  const [Bookid, setBookid] = useState(0);
  //const [Books, setBooks] = useState(getBooksFromStorage())
  const addListenerToRow = (id: any) => {
    setBookid(id);
  };
  const handleToken = (token: string) => {
    setToken(token);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else setToken(false);
  });
  return (
    <div className="main-page">
      <Router>
        <Switch>
          <ContextProvider>
            <Route path="/addNewBook">
              <Header tokenFlag={token}></Header>
              <AddBook></AddBook>
            </Route>
            <Route path="/register">
              <Header tokenFlag={token}></Header>
              <Register></Register>
            </Route>
            <Route path="/login">
              <Header tokenFlag={token}></Header>
              <Login handleToken={handleToken}></Login>
            </Route>
            <Route path="/book/:id">
              <Header tokenFlag={token}></Header>
              <BookDetails bookID={Bookid}></BookDetails>
            </Route>
            <Route exact path="/">
              <Header tokenFlag={token}></Header>
              <BookList handleClick={addListenerToRow}></BookList>
            </Route>
            <Route exact path="/logoff">
              <Header tokenFlag={token}></Header>
              <Logout></Logout>
            </Route>
          </ContextProvider>
        </Switch>
      </Router>
    </div>
  );
}
