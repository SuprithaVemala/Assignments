import {Book} from'./book.js';
import {bookManager} from './bookManager.js';

//create object of bookManager class
let manager:bookManager=new bookManager();

let bookTable=document.getElementById('bookTable')

// function display books in table
function addBookstoTable(books: Book[]){
    
    //delete all previous entries
    let tableRows=document.querySelectorAll('.bodyRow')
    for(let row of tableRows){​​​​​​​​
        row.remove()
    }​​​​​​​​
    //add books to table 
    for(let b of books)
    {
        let title=b.title
        let author=b.author
        let rating=b.rating
    
        //create elements
        let tableRow=document.createElement('tr')
        let td1=document.createElement('td')
        let td2=document.createElement('td')
        let td3=document.createElement('td')
        let td4=document.createElement('td')
        let btn=document.createElement('button')
        //add content
        td1.textContent=title
        td2.textContent=author
        td3.textContent=rating.toString()
        btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>`
        //add styling
        tableRow.classList.add('bodyRow')
        td1.classList.add('table_data')
        td2.classList.add('table_data')
        td3.classList.add('table_data')
        td4.classList.add('table_data')
        btn.classList.add('button')
        //apend childern
        td4.appendChild(btn)
        tableRow.appendChild(td1)
        tableRow.appendChild(td2)
        tableRow.appendChild(td3)
        tableRow.appendChild(td4)
        //apend table row to table
       bookTable?.appendChild(tableRow)
    }
    
}

//display all books
addBookstoTable(manager.getBooksFromArray())


//on click listener to delete book
bookTable?.addEventListener('click',function(e){
    let targetElement=e.target as HTMLButtonElement
    if(targetElement.classList.contains("button"))
    {
        let p=targetElement.parentElement?.parentElement
        let title=p?.children[0].textContent
        if(title)
        manager.deleteBookFromStorage(title)
        p?.remove()
    }
})


//event listener to select the type of search
let searchBtn=document.getElementById("search")
searchBtn?.addEventListener('click',function(e){
    let option=document.getElementById("displayOptions") as HTMLInputElement
    let value=option.value
    let searchVal=document.getElementById('searchBar') as HTMLInputElement 
    let searchtype=searchVal.value
    let Matchedbooks:Book[]=[]
    switch(value)
    {
        case "id":  if(searchtype!=null){​​​​​​​​
                        Matchedbooks=manager.searchOnId(manager.getBooksFromArray(),searchtype)
                        addBookstoTable(Matchedbooks);
                    }​​​​​​​​
                    break;
        case "title":  if(searchtype!=null){​​​​​​​​
                        Matchedbooks=manager.searchOnName(manager.getBooksFromArray(),searchtype)
                        addBookstoTable(Matchedbooks);
                    }​​​​​​​​
                    break;
        case "author":  if(searchtype!=null){​​​​​​​​
                        Matchedbooks=manager.searchOnAuthor(manager.getBooksFromArray(),searchtype)
                        addBookstoTable(Matchedbooks);
                    }​​​​​​​​
                    break;
        case "rating": if(searchtype!=null){
                        Matchedbooks=manager.searchByRating(manager.getBooksFromArray(),Number(searchtype))
                        addBookstoTable(Matchedbooks); 
                    }
                    break;
        case "price": if(searchtype!=null){
                        Matchedbooks=manager.searchByPrice(manager.getBooksFromArray(),searchtype)
                        addBookstoTable(Matchedbooks);
                    }
                    break;
    }
})

//event listener to submit the add book details from form

let form=document.getElementById("addBookForm")

form?.addEventListener('submit',e=>{
    let newBookDetails:Book
    let id=document.getElementById("bookID") as HTMLInputElement
    let title=document.getElementById("title") as HTMLInputElement
    let author=document.getElementById("authorName") as HTMLInputElement
    let rating=document.getElementById("rating") as HTMLInputElement
    let price=document.getElementById("price") as HTMLInputElement
    let details=document.getElementById("description") as HTMLInputElement
    let coverURL=document.getElementById("coverPhotoURL") as HTMLInputElement
    alert("Book added sucessfully")
    newBookDetails=new Book(Number(id.value),title.value,author.value,Number(price.value),Number(rating.value),details.value,coverURL.value)
    manager.addBookstoArray(newBookDetails)
}) 

let displayBooks=document.getElementById("list")
let addBooks=document.getElementById("add")
let book_div=document.getElementById("newBooks")
let allBooks=document.getElementById("find")
displayBooks?.addEventListener('click',e=>{
    if(book_div)
    book_div.style.display='none';
    if(allBooks)
    allBooks.style.display='block';

})

addBooks?.addEventListener('click',e=>{
    if(book_div)
    book_div.style.display='block';
    if(allBooks)
    allBooks.style.display='none';
})