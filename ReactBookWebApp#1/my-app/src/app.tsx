import Header from "./components/dashboard/header";
import BookList from "./components/booklist";
import AddBook from "./components/addBook";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import BookDetails from "./components/bookDetails";
import { useEffect, useState } from "react";


interface Props {}

export default function App({}: Props) {

  const [Bookid, setBookid] = useState(0);
  //const [Books, setBooks] = useState(getBooksFromStorage())
  const addListenerToRow = (id: any) => {
    setBookid(id);
  };
  return (
    <div className="main-page">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/addNewBook">
            <AddBook></AddBook>
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
