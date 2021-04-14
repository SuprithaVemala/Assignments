import { updateBookToDB,findAllBooks ,deleteBook, findBook,findBookBySimpleText,findBookByAuthorName,findBookByPriceRange,getDataFromBody,addBookToDB} from "../model/bookModel";


async function getAllBooks(req:any,res:any){
    try{
        const books = await findAllBooks();
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(books))
    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error))
    }
}   

async function getSpecificBook(req:any,res:any,id:number){
    try{
        const book = await findBook(id);
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))
    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
} 

//description: Delete Product

async function deleteSpecificBook(req:any, res:any, id:number){
    try{
        const book = await deleteBook(id);
       // await book.remove(id)
        res.writeHead(200,{'content-type':'text/plain'})
        res.end("removed");
    }catch(error){
        console.log(error);
    }
}   
async function getBooksBySimpleSearch(req:any, res:any, searchText:string){
    try{
        const book = await findBookBySimpleText(searchText);
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))
    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
}

async function getBooksByAuthorName(req:any, res:any, authorName:string){
    try{
        const book = await findBookByAuthorName(authorName);
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))

    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
}

async function getBooksInPriceRange(req:any, res:any, priceArray:string[]){
    try{
        const book = await findBookByPriceRange(priceArray);
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))

    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
}

async function addBookToJsonFile(req:any, res:any){
    try{
        const bookData:any = await getDataFromBody(req);
        let {title,author,rating,price,pages,description,votes}=JSON.parse(bookData)
        const newBook:{}={
            title,author,rating,price,pages,description,votes
        }
        let addedBook=await addBookToDB(newBook)
        res.writeHead(201,{'content-type':'application/json'})
        res.end(JSON.stringify(addedBook))

    }catch(error){
        console.log(error);
    }
}

async function updateBookById(req:any,res:any,id:string){
    try{​​​​​​​​
        const book:any=await findBook(Number(id));
        if(!book) {​​​​​​​​
            res.writeHead(404, {​​​​​​​​ 'Content-Type':'application/json' }​​​​​​​​)
            res.end(JSON.stringify('Book Not Found'))
        }​​​​​​​​
        else {
            try{
                const bookData:any = await getDataFromBody(req);
                let {title,author,rating,price,pages,description,votes}=JSON.parse(bookData)
                const modifiedBook:{}={
                    title:title || book.title,
                    author:author || book.author,
                    rating:rating||book.rating,
                    price:price||book.price,
                    pages:pages || book.pages,
                    description: description ||book.description,
                    votes: votes || book.votes
                }
                let addedBook=await updateBookToDB(modifiedBook,id)
                res.writeHead(200,{'content-type':'application/json'})
                res.end(JSON.stringify(addedBook))
            }catch(error){
                console.log(error);
            }   ​
        }​​​​​​​​  
    }​​​​​​​​
    catch(error)
    {​​​​​​​​
        console.log(error.message)   
    }​​​​​​​​  
}
​​​​​​​​




export { updateBookById,getAllBooks ,deleteSpecificBook ,getSpecificBook, getBooksBySimpleSearch,getBooksByAuthorName,getBooksInPriceRange,addBookToJsonFile}

