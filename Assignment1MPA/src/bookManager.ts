import {Book} from "./book.js";
 
export class bookManager{

    //method to add new book localstorage
    addBookstoArray(newBook:Book){
        let books:Book[]=[]
        if(typeof Storage!=="undefined"){
            let stringBooks=localStorage.getItem("books")
            if(stringBooks)
                books=JSON.parse(stringBooks)  
           /*  books.push(new Book(1,"great morning","rachel",30,7,"book for ppl"))
            books.push(new Book(2,"confused life","david",60,5,"book for ppl"))
            books.push(new Book(3,"all about me","jhonson",20,2,"book for ppl"))
            books.push(new Book(4,"y life?","merry",40,3,"book for ppl"))
            books.push(new Book(5,"Hotel for souls","henry",69,8,"book for ppl"))  
            localStorage.removeItem("books") */
            books.push(newBook)
             stringBooks=JSON.stringify(books)
            localStorage.setItem("books",stringBooks)
        }else{
            console.log("local storage not supported")
        }
    }

    //get books from localstorage
    getBooksFromArray(){
        let backBooks:Book[]=[]
        if(typeof Storage!=="undefined"){
            let stringBooks=localStorage.getItem("books")
            if(stringBooks)
            backBooks=JSON.parse(stringBooks)
        }else{
            console.log("local storage not supported")
        }
        return backBooks
    }

    //delete a book from localstorage
    deleteBookFromStorage(title:string){
        let books:Book[]=[]
        if(typeof Storage!=="undefined"){
            let stringBooks=localStorage.getItem("books")
            if(stringBooks)
                books=JSON.parse(stringBooks)
            for(let i=0;i<books.length;i++)
            {
                if(books[i].title===title)
                {
                    books.splice(i,1)
                    break;
                }
            }
            stringBooks=JSON.stringify(books)
            localStorage.setItem("books",stringBooks)
        }else{
            console.log("local storage not supported")
        }
    }

    //method to find given ID
    searchOnId(books:Book[],searchNum:string){​​​​​​​​
        let idsearchedBooks:Book[]=[];
        for(let b of books){​​​​​​​​
        let myNum=b.bookID.toString()
        if(myNum==searchNum){​​​​​​​​
            idsearchedBooks.push(b);
            }​​ ​​​​​​
        }​​​​​  ​​​
        return idsearchedBooks;
    }​​​​​​​​

    //method to search by book name
    searchOnName(books: Book[], searchName: string) {
        let nameSearchedBooks:Book[]=[];
        for(let b of books){​​​​​​​​
            let pos=b.title.toLowerCase().indexOf(searchName.toLowerCase())
            if(pos!=-1)
            {
                nameSearchedBooks.push(b)​​​
                continue
            }
        }
        return nameSearchedBooks;
    }

    //search by author name
    searchOnAuthor(books: Book[], searchName: string) {
        let nameSearchedBooks:Book[]=[];
        for(let b of books){​​​​​​​​
            let pos=b.author.toLowerCase().indexOf(searchName.toLowerCase())
            if(pos!=-1)
            {
                nameSearchedBooks.push(b)​​​
                continue
            }
        }
        return nameSearchedBooks;
    }

    //function to find rating less than given value
    searchByRating(books:Book[], rating:number){
        let ratingSearchedBooks:Book[]=[];
        for(let b of books)
        {
            if(b.rating<=rating)
                ratingSearchedBooks.push(b)
        }
        return ratingSearchedBooks;
    }

    //function to search on price range
    searchByPrice(books:Book[], priceString:string){
        let priceSearchedBooks:Book[]=[]
        let ary=priceString.split(' ')
        for(let b of books)
        {
            if(b.price>=Number(ary[0]) && b.price<=Number(ary[1]))
                priceSearchedBooks.push(b)
        }
        return priceSearchedBooks
    }
}


