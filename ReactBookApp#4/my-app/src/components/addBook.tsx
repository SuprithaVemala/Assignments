import Input from "./generateInputs";
import {UserContext} from "../userContext"
import { useState } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";

interface Props {}

export default function AddBook({}: Props) {
  const history=useHistory()
  const {state,dispatch} = useContext(UserContext)
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
  const submitDetails = (e:any) => {
    e.preventDefault()
    let bookid=state.books[state.books.length-1].id +1
    let newBook={...Book,id:bookid}
    dispatch({type:"add-book",payload:newBook})
   /*  if(localStorage.getItem("token")){
      fetch("http://localhost:5000/books", {
      method: "POST",
      body: JSON.stringify(Book),
      headers: { "Content-Type": "application/json","Authorization":`${localStorage.getItem("token")}` },
    })
    }
    else{
      console.log("Login to add book")
    } */

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
