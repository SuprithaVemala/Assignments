import {getDataFromBody} from "../model/bookModel";
import {model} from "../model/bookSchema"

async function getAllBooks(req:any,res:any){
    try{
        
        const books = await model.find()
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(books))
    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error))
    }

}   

async function getSpecificBook(req:any,res:any,id:string){
    try{
        const book = await model.findById(id)
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))
    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
} 

//description: Delete Product

async function deleteSpecificBook(req:any, res:any, id:string){
    try{
        const book = await model.findByIdAndDelete(id);
       // await book.remove(id)
        res.writeHead(200,{'content-type':'text/plain'})
        res.end("removed");
    }catch(error){
        console.log(error);
    }
}   
async function getBooksBySimpleSearch(req:any, res:any, searchText:string){
    try{
        const book = await model.find({$or:[{"title":searchText},{"author":searchText},{"description":searchText}]})
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))
    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
}

async function getBooksByAuthorName(req:any, res:any, authorName:string){
    try{
        const book = await model.find({"author":authorName})
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(book))

    }catch(error){
        res.writeHead(404,{'content-type':'application/json'})
        res.end(JSON.stringify(error));
    }
}

async function getBooksInPriceRange(req:any, res:any, priceArray:string[]){
    try{
        const book = await model.find({$and:[{"price" :{$lte:priceArray[1]}},{"price":{$gte:priceArray[0]}}]})
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
        let addedBook=await model.create(newBook)
        res.writeHead(201,{'content-type':'application/json'})
        res.end(JSON.stringify(addedBook))

    }catch(error){
        console.log(error);
    }
}

async function updateBookById(req:any,res:any,id:string){
    try{​​​​​​​​
        const book:any=await model.findById(id);
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
                let addedBook=await model.findByIdAndUpdate(id,modifiedBook)
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

