import { Book } from './book.js';
import { bookManager } from './bookManager.js';
//create object of bookManager class
let manager = new bookManager();
let bookTable = document.getElementById('bookTable');
// function display books in table
function addBookstoTable(books) {
    //delete all previous entries
    let tableRows = document.querySelectorAll('.bodyRow');
    for (let row of tableRows) {
        row.remove();
    }
    //add books to table 
    for (let b of books) {
        let title = b.title;
        let author = b.author;
        let rating = b.rating;
        //create elements
        let tableRow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let btn = document.createElement('button');
        //add content
        td1.textContent = title;
        td2.textContent = author;
        td3.textContent = rating.toString();
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>`;
        //add styling
        tableRow.classList.add('bodyRow');
        td1.classList.add('table_data');
        td2.classList.add('table_data');
        td3.classList.add('table_data');
        td4.classList.add('table_data');
        btn.classList.add('button');
        //apend childern
        td4.appendChild(btn);
        tableRow.appendChild(td1);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);
        tableRow.appendChild(td4);
        //apend table row to table
        bookTable === null || bookTable === void 0 ? void 0 : bookTable.appendChild(tableRow);
    }
}
//display all books
addBookstoTable(manager.getBooksFromArray());
//on click listener to delete book
bookTable === null || bookTable === void 0 ? void 0 : bookTable.addEventListener('click', function (e) {
    var _a;
    let targetElement = e.target;
    if (targetElement.classList.contains("button")) {
        let p = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        let title = p === null || p === void 0 ? void 0 : p.children[0].textContent;
        if (title)
            manager.deleteBookFromStorage(title);
        p === null || p === void 0 ? void 0 : p.remove();
    }
});
//event listener to select the type of search
let searchBtn = document.getElementById("search");
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener('click', function (e) {
    let option = document.getElementById("displayOptions");
    let value = option.value;
    let searchVal = document.getElementById('searchBar');
    let searchtype = searchVal.value;
    let Matchedbooks = [];
    switch (value) {
        case "id":
            if (searchtype != null) {
                Matchedbooks = manager.searchOnId(manager.getBooksFromArray(), searchtype);
                addBookstoTable(Matchedbooks);
            }
            break;
        case "title":
            if (searchtype != null) {
                Matchedbooks = manager.searchOnName(manager.getBooksFromArray(), searchtype);
                addBookstoTable(Matchedbooks);
            }
            break;
        case "author":
            if (searchtype != null) {
                Matchedbooks = manager.searchOnAuthor(manager.getBooksFromArray(), searchtype);
                addBookstoTable(Matchedbooks);
            }
            break;
        case "rating":
            if (searchtype != null) {
                Matchedbooks = manager.searchByRating(manager.getBooksFromArray(), Number(searchtype));
                addBookstoTable(Matchedbooks);
            }
            break;
        case "price":
            if (searchtype != null) {
                Matchedbooks = manager.searchByPrice(manager.getBooksFromArray(), searchtype);
                addBookstoTable(Matchedbooks);
            }
            break;
    }
});
//event listener to submit the add book details from form
let form = document.getElementById("addBookForm");
form === null || form === void 0 ? void 0 : form.addEventListener('submit', e => {
    let newBookDetails;
    let id = document.getElementById("bookID");
    let title = document.getElementById("title");
    let author = document.getElementById("authorName");
    let rating = document.getElementById("rating");
    let price = document.getElementById("price");
    let details = document.getElementById("description");
    let coverURL = document.getElementById("coverPhotoURL");
    alert("Book added sucessfully");
    newBookDetails = new Book(Number(id.value), title.value, author.value, Number(price.value), Number(rating.value), details.value, coverURL.value);
    manager.addBookstoArray(newBookDetails);
});
let displayBooks = document.getElementById("list");
let addBooks = document.getElementById("add");
let book_div = document.getElementById("newBooks");
let allBooks = document.getElementById("find");
displayBooks === null || displayBooks === void 0 ? void 0 : displayBooks.addEventListener('click', e => {
    if (book_div)
        book_div.style.display = 'none';
    if (allBooks)
        allBooks.style.display = 'block';
});
addBooks === null || addBooks === void 0 ? void 0 : addBooks.addEventListener('click', e => {
    if (book_div)
        book_div.style.display = 'block';
    if (allBooks)
        allBooks.style.display = 'none';
});
