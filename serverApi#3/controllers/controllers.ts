import { model } from "../model/bookSchema";

async function getAllBooks(req: any, res: any) {
  try {
    const books = await model.find();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function getSpecificBook(req: any, res: any, id: any) {
  try {
    const book = await model.findById(id);
    res.send(book);
  } catch (error) {
    res.send("Book not found");
  }
}

//description: Delete Product

async function deleteSpecificBook(req: any, res: any, id: string) {
  try {
    const book = await model.findByIdAndDelete(id);
    // await book.remove(id)
    res.writeHead(200, { "content-type": "text/plain" });
    if (book) res.end("removed");
    else res.end("Book not found");
  } catch (error) {
    console.log(error);
  }
}
async function getBooksBySimpleSearch(req: any, res: any, searchText: string) {
  try {
    const book = await model.find({
      $or: [
        { title: searchText },
        { author: searchText },
        { description: searchText },
      ],
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function getBooksByAuthorName(req: any, res: any, authorName: string) {
  try {
    const book = await model.find({ author: authorName });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function getBooksInPriceRange(req: any, res: any, priceArray: string[]) {
  try {
    const book = await model.find({
      $and: [
        { price: { $lte: priceArray[1] } },
        { price: { $gte: priceArray[0] } },
      ],
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function addBookToDB(req: any, res: any) {
  try {
    let newBook = new model();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.rating = req.body.rating;
    newBook.price = req.body.price;
    newBook.pages = req.body.pages;
    newBook.description = req.body.description;
    newBook.votes = req.body.votes;
    let addedBook = await model.create(newBook);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify(addedBook));
  } catch (error) {
    res.send("Couldnot add book")
  }
}

async function updateBookById(req: any, res: any, id: string) {
  try {
    const book: any = await model.findById(id);
    try {
      let modifiedBook = new model();
      modifiedBook._id = book._id;
      modifiedBook.title = req.body.title || book.title;
      modifiedBook.author = req.body.author || book.author;
      modifiedBook.rating = req.body.rating || book.rating;
      modifiedBook.price = req.body.price || book.price;
      modifiedBook.pages = req.body.pages || book.pages;
      modifiedBook.description = req.body.description || book.description;
      modifiedBook.votes = req.body.votes || book.votes;
      let addedBook = await model.findByIdAndUpdate(id, modifiedBook, {
        new: true,
      });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(addedBook));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.send("Book not found");
  }
}
export {
  updateBookById,
  getAllBooks,
  deleteSpecificBook,
  getSpecificBook,
  getBooksBySimpleSearch,
  getBooksByAuthorName,
  getBooksInPriceRange,
  addBookToDB,
};
