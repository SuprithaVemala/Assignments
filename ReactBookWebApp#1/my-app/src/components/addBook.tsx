import Input from "./generateInputs";
import { getBooksFromStorage, addBooksToStorage } from "../utils";

import { useState } from "react";
import { useHistory } from "react-router";

interface Props {}

export default function AddBook({}: Props) {
  const history=useHistory()
  const [Book, setBook] = useState({
    Title: "",
    Author: "",
    Price: 0,
    Cover: "",
    Rating: 0,
    Description: "",
  });
  const myChangeHandler = (event: any) => {
    let nam = event.target.name;
    let val = event.target.value;
    setBook({ ...Book, [nam]: val });
  };
  const submitDetails = () => {
    let books = getBooksFromStorage();
    let id: number;
    if (books) {
      id = books[books.length - 1].id + 1;
    } else id = 1;
    let newBook = {
      id: id,
      ...Book,
    };
    addBooksToStorage(newBook);
    history.push("/")
  };
  return (
    <div className="addForm">
      <h2 style={{ color: "rgb(240, 106, 106)", margin: "1.5vw" }}>
        Add Book Details
      </h2>
      <form onSubmit={submitDetails}>
        <Input type="text" name="Title" onchange={myChangeHandler}></Input>
        <Input type="text" name="Author" onchange={myChangeHandler}></Input>
        <Input type="number" name="Price" onchange={myChangeHandler}></Input>
        <Input type="number" name="Rating" onchange={myChangeHandler}></Input>
        <Input
          type="text"
          name="Description"
          onchange={myChangeHandler}
        ></Input>
        <Input type="text" name="Cover" onchange={myChangeHandler}></Input>
        <button className="navLink submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
