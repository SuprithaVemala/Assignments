
import { useState } from "react";
import {  useHistory, useParams } from "react-router-dom";
import Rating from "./rating";
import { useEffect } from "react";
interface Props {
  bookID?: number;
}

export default function BookDetails({ bookID }: Props) {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  let [book, setBook] = useState<any>({});
  const [delBtn, setDelBtn] = useState(false);
  useEffect(() => {
    if (bookID) {
      fetch(`http://localhost:5000/books/${bookID}`)
        .then((result) => result.json())
        .then((data) => setBook(data));
    } else {
      fetch(`http://localhost:5000/books/${params.id}`)
        .then((result) => result.json())
        .then((data) => {
          setBook(data);
          console.log(`book`, book);
        });
    }
    if (localStorage.getItem("token")) setDelBtn(true);
  }, []);
  return (
    <>
      <div className="book-display">
        <img className="large-image" src={book.Cover} alt="Book cover"></img>
        <span className="book-content">
          <h1>{book.Title}</h1>
          <span>
            By <h4 className="span-content">{book.Author}</h4> Rating:{" "}
            <Rating rating={book.Rating}></Rating> | Price: {book.Price}
          </span>
          <p>{book.Description}</p>
        </span>
        {delBtn === true ? (
          <button
            className="navLink submitBtn"
            onClick={() => {
              if (localStorage.getItem("token")) {
                fetch(`http://localhost:5000/books/${book._id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                  },
                });
              } else {
                console.log("Login to delete book");
              }
              history.push("/");
            }}
          >
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
