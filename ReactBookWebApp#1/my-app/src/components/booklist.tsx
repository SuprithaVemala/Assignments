import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BookDetails from "./bookDetails";
import { searchBooks } from "../utils";
import { getBooksFromStorage } from "../utils";
import Rating from "./rating";
import BookNotFound from "../lottie/bookNotFound";
interface Props {
  handleClick: Function;
}

interface Props {}

export default function BookList({ handleClick }: Props) {
  const [SearchData, setSearchData] = useState("");
  const [Books, setBooks] = useState(getBooksFromStorage());
  const [Choice, setChoice] = useState("");
  const getdropdrownValue = (e: any) => {
    setChoice(e.target.value);
  };
  const myChangeHandler = (e: any) => {
    setSearchData(e.target.value);
  };
  const getSearchDetails = (searchText: string, choice: string) => {
    let shortlistedBooks = searchBooks(searchText, choice);
    setBooks([]);
    if (shortlistedBooks) {
      setBooks(shortlistedBooks);
    }
  };

  return (
    <>
      <form id="searchName" className="form-inline searchForm">
        <select onClick={getdropdrownValue} className="dropDown">
          <option value="" selected disabled>
            Select the type of search
          </option>
          <option value="id">Select by ID</option>
          <option value="Title">Select by book title</option>
          <option value="Author">Select by Author name</option>
          <option value="rating">Select by rating</option>
          <option value="price">Select by price</option>
        </select>
        <input
          type="search"
          placeholder="search"
          onChange={myChangeHandler}
          className="form-control searchBar"
        ></input>
        <button
          className="searchBtn"
          type="button"
          onClick={() => getSearchDetails(SearchData, Choice)}
        >
          Search
        </button>
      </form>

      {Books?.length !== 0 ? (
        Books?.length !== 1 ? (
          Books?.map((book: any) => {
            let url = `/book/${book.id}`;
            return (
              <Link to={url}>
                <div
                  className="color-for-div card mb-3 bookDiv"
                  onClick={() => handleClick(book.id)}
                >
                  <img
                    className="card-img-top toolTip"
                    src={book.Cover}
                    alt="book cover"
                  />
                  <div className="card-body bookDetails">
                    <h5 className="card-title">{book.Title}</h5>
                    <h6 className="card-text cards">
                      <small>Book by </small>
                      {book.Author}
                    </h6>
                    <span className="subData">
                      Rating: <Rating rating={book.Rating}></Rating>
                    </span>
                    <br></br>
                    <span className="subData">Price: {book.Price}</span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : Books[0] !== undefined ? (
          <BookDetails bookID={Books[0].id}></BookDetails>
        ) : (
          <BookNotFound></BookNotFound>
        )
      ) : (
        <BookNotFound></BookNotFound>
      )}
    </>
  );
}
