import React, { ReactElement } from "react";
import { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getBookByID, deleteBook } from "../utils";
import BookNotFound from '../lottie/bookNotFound'
import Rating from './rating'
interface Props {
  bookID?:number
}

export default function BookDetails({bookID }: Props) {
 
  const history=useHistory()
  const params=useParams<{id:string}>()
  let book:any
  if(bookID)
  {
    book=getBookByID(bookID)
  }
  else{
    if(params.id===undefined){
      return(
       <BookNotFound></BookNotFound>
      )
    }
    book= getBookByID(Number(params.id));
    
  }
 
  return (
    <>
      <div className="book-display">
        <img className="large-image" src={book.Cover} alt="Book cover"></img>
        <span className="book-content">
          <h1>{book.Title}</h1>
          <span>
            By <h4 className="span-content">{book.Author}</h4>  Rating: <Rating rating={book.Rating}></Rating>            |  Price: {book.Price}
          </span>
          <p>{book.Description}</p>
        </span>
        <button
          className="navLink submitBtn"
          onClick={() => {
            deleteBook(book.id);
            history.push("/")
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
