import * as http from "http";
import {updateBookById,getAllBooks,deleteSpecificBook, getSpecificBook, getBooksBySimpleSearch,getBooksByAuthorName,getBooksInPriceRange,addBookToJsonFile} from './controllers/controllers';


let server = http.createServer((req, res) => {
  if (req.url) {
    const myParams = new URLSearchParams(req.url.split('?')[1]);
    
    if (req.url === "/books" && req.method === "GET") {
      getAllBooks(req,res);
    }else if (req.url === "/books" && req.method === "POST") {
      addBookToJsonFile(req,res)
    } else if (req.url?.match(/\/books\/[0-9]+/) && req.method === "GET") {
      let id = req.url?.split("/")[2];
      getSpecificBook(req,res,parseInt(id));
     
    } else if (myParams.has('q') && req.method === "GET") {
      let searchText=myParams.get("q")
      if(searchText)
      getBooksBySimpleSearch(req,res,searchText)
      //res.end(`simple text=${myParams.get("q")}`);
    } else if (myParams.has("author") && req.method === "GET") {
      let author=myParams.get("author")
      if(author)
      getBooksByAuthorName(req,res,author)
      //res.end(`simple text=${myParams.get("author")}`);
    } else if (myParams.has("price") && req.method === "GET") {
      let priceAry=myParams.getAll("price")
      if(priceAry)
      getBooksInPriceRange(req,res,priceAry)
      //res.end(`simple text=${myParams.getAll("price")}`);
    } else if (req.url?.match(/\/books\/[0-9]+/) && req.method === "PUT") {
      let id = req.url?.split("/")[2];
      updateBookById(req,res,id)
      //res.end(`get book by id=${id}`);
    } else if (req.url?.match(/\/books\/[0-9]+/) && req.method === "DELETE") {
      let id = req.url?.split("/")[2];
      deleteSpecificBook(req,res,parseInt(id));
     // res.end(`get book by id=${id}`);
    } else res.end("URL not found");
  }
});

const port = 5000;
server.on("error", (err) => console.log(err.message));
server.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
