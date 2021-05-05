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
        { Title: new RegExp(searchText, "i") },
        { Author: new RegExp(searchText, "i") },
        { Description: new RegExp(searchText, "i") },
        { tags: new RegExp(searchText, "i") },
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
    const book = await model.find({ Author: new RegExp(authorName, "i")  });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function getBooksInPriceRange(
  req: any,
  res: any,
  min: string,
  max: string
) {
  try {
    const book = await model.find({
      $and: [{ Price: { $lte: max } }, { Price: { $gte: min } }],
    });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(book));
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function getBookByRating(req: any, res: any, rating: string) {
  try {
    const book = await model.find({ Rating: { $gte: rating } });
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
    newBook.Title = req.body.Title;
    newBook.Author = req.body.Author;
    newBook.Rating = req.body.Rating;
    newBook.Price = req.body.Price;
    newBook.Description = req.body.Description;
    newBook.Cover=req.body.Cover;
    let addedBook = await model.create(newBook);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify(addedBook));
  } catch (error) {
    res.send("Couldnot add book");
  }
}

async function patchBookById(req: any, res: any, id: string) {
  try {
    const book: any = await model.findById(id);
    try {
      let modifiedBook = new model(req.body);
      modifiedBook._id = book._id;
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

async function putBookById(req: any, res: any, id: string) {
  try {
    const book: any = await model.findById(id);
    try {
      let modifiedBook = new model();
      modifiedBook = { _id: book._id, ...req.body };
      let addedBook = await model.findOneAndReplace({ _id: id }, modifiedBook, {
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
  patchBookById,
  getAllBooks,
  deleteSpecificBook,
  getSpecificBook,
  getBooksBySimpleSearch,
  getBooksByAuthorName,
  getBooksInPriceRange,
  addBookToDB,
  putBookById,
  getBookByRating,
  
};
