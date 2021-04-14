import * as fs from "fs";
let data: any = "";
let myReadStream = fs.createReadStream("./data/db.json", "utf8");
myReadStream.on("data", (buffer) => (data += buffer));
let books: any;
myReadStream.on("end", () => (books = JSON.parse(data)));
/* fs.readFile("./data/db.json","utf8",(err,data)=>{
  books=JSON.parse(data)
}); */
/* let books = JSON.parse(data); */
/* const data: any = fs.readFileSync("./data/db.json");
    let books = JSON.parse(data); */

function deleteBook(id: number) {
  return new Promise((resolve) => {
    let array: any[] = [];
    for (let element of books.books) {
      if (element.id !== id) {
        array.push(element);
      }
    }

    let newBooks = { books: array };
    fs.writeFileSync("./data/db.json", JSON.stringify(newBooks));
    resolve("deleted");
  });
}

function findAllBooks() {
  return new Promise((resolve, reject) => {
    let data: any = "";
    let myReadStream = fs.createReadStream("./data/db.json", "utf8");
    myReadStream.on("data", (buffer) => (data += buffer));
    let books: any;
    myReadStream.on("end", () => {
      books = JSON.parse(data);
      if (books) resolve(books);
      else reject("Books not found");
    });
  });
}

function findBook(id: number) {
  return new Promise((resolve, reject) => {
    let data: any = "";
    let myReadStream = fs.createReadStream("./data/db.json", "utf8");
    myReadStream.on("data", (buffer) => (data += buffer));
    let books: any;
    myReadStream.on("end", () => {
      books = JSON.parse(data);
      for (let ele of books.books) {
        if (ele.id == id) {
          resolve(ele);
        }
      }
      reject("book not found");
    });
  });
}

function findBookBySimpleText(searchText: string) {
  return new Promise((resolve, reject) => {
    let shortListedBooks: any[] = [];
    for (let b of books.books) {
      if (b.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
        shortListedBooks.push(b);
      else if (b.author.toLowerCase().indexOf(searchText.toLowerCase()) != -1)
        shortListedBooks.push(b);
      else if (
        b.description.toLowerCase().indexOf(searchText.toLowerCase()) != -1
      )
        shortListedBooks.push(b);
    }
    if (shortListedBooks.length != 0) resolve(shortListedBooks);
    else reject("No book found");
  });
}

function findBookByAuthorName(authorName: string) {
  return new Promise((resolve, reject) => {
    let shortListedBooks: any[] = [];
    for (let b of books.books) {
      if (b.author.toLowerCase().indexOf(authorName.toLowerCase()) != -1)
        shortListedBooks.push(b);
    }
    if (shortListedBooks.length != 0) resolve(shortListedBooks);
    else reject("No book found");
  });
}

function findBookByPriceRange(priceArray: string[]) {
  return new Promise((resolve, reject) => {
    let shortListedBooks: any[] = [];
    let low: string = priceArray[0];
    let high: string = priceArray[1];
    for (let b of books.books) {
      if (b.price <= high && b.price >= low) shortListedBooks.push(b);
    }
    if (shortListedBooks.length != 0) resolve(shortListedBooks);
    else reject("No book found");
  });
}

function getDataFromBody(req: any) {
  return new Promise((resolve, reject) => {
    try {
      let data: string = "";
      req.on("data", (chunck: any) => {
        data += chunck.toString();
      });
      req.on("end", () => resolve(data));
    } catch (err) {
      reject(err);
    }
  });
}

function writeToFile(books: any) {
  fs.writeFileSync("./data/db.json", JSON.stringify(books), "utf8");
}

function addBookToDB(Book: {}) {
  return new Promise((resolve, reject) => {
    let length: number = books.books.length;
    let lastObject = books.books[length - 1];
    let id: number = lastObject.id;
    let book = { id: id + 1, ...Book };
    books.books.push(book);
    writeToFile(books);
    resolve(book);
  });
}

function updateBookToDB(modifiedBook: any, id: string) {
  return new Promise((resolve, reject) => {
    let index = books.books.findIndex((b: any) => b.id === Number(id));
    books.books[index] = { id: Number(id), ...modifiedBook };
    writeToFile(books);
    resolve(modifiedBook);
  });
}

export {
  deleteBook,
  updateBookToDB,
  addBookToDB,
  findAllBooks,
  findBook,
  findBookBySimpleText,
  findBookByAuthorName,
  findBookByPriceRange,
  getDataFromBody,
};
