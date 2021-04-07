import { Book } from "./book.js";
let bookTable = document.getElementById('bookTable');
let books = [];
books.push(new Book(1, "great morning", "rachel", 30, 7, "book for ppl"));
books.push(new Book(2, "confused life", "david", 60, 5, "book for ppl"));
books.push(new Book(3, "all about me", "jhonson", 20, 2, "book for ppl"));
books.push(new Book(4, "y life?", "merrry", 40, 3, "book for ppl"));
books.push(new Book(5, "Hotel for souls", "henry", 69, 8, "book for ppl"));
let addBookstoTable = function (books) {
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
        btn.textContent = "Delete";
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
};
//display all books
addBookstoTable(books);
//display all book
console.log(books);
//on click listener to delete book
bookTable === null || bookTable === void 0 ? void 0 : bookTable.addEventListener('click', function (e) {
    var _a;
    let targetElement = e.target;
    if (targetElement.classList.contains("button")) {
        let p = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        p === null || p === void 0 ? void 0 : p.remove();
    }
});
let idButton = document.getElementById("findBookID");
//on click listener for search on id
idButton === null || idButton === void 0 ? void 0 : idButton.addEventListener('click', function (e) {
    let searchVal = document.getElementById('bookName');
    let searchNumber = searchVal.value;
    console.log("searchNumber " + searchNumber);
    if (searchNumber != null) {
        let idMatchedbooks = searchOnId(books, searchNumber);
        addBookstoTable(idMatchedbooks);
    }
});
//method to find given ID
function searchOnId(books, searchNum) {
    let idsearchedBooks = [];
    for (let b of books) {
        let myNum = b.bookID.toString();
        if (myNum == searchNum) {
            idsearchedBooks.push(b);
        }
    }
    return idsearchedBooks;
}
let searchButton = document.getElementById("findBookByName");
//on click listener for search on name
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', function (e) {
    let searchVal = document.getElementById('bookName');
    let searchName = searchVal.value;
    console.log("searchNumber " + searchName);
    if (searchName != null) {
        let nameMatchedbooks = searchOnName(books, searchName);
        addBookstoTable(nameMatchedbooks);
    }
});
//method to search by book name
function searchOnName(books, searchName) {
    let nameSearchedBooks = [];
    for (let b of books) {
        let pos = b.title.toLowerCase().indexOf(searchName.toLowerCase());
        if (pos != -1) {
            nameSearchedBooks.push(b);
            continue;
        }
        pos = b.author.toLowerCase().indexOf(searchName.toLowerCase());
        if (pos != -1) {
            nameSearchedBooks.push(b);
            continue;
        }
        pos = b.description.toLowerCase().indexOf(searchName.toLowerCase());
        if (pos != -1) {
            nameSearchedBooks.push(b);
            continue;
        }
    }
    return nameSearchedBooks;
}
//search by author name
function searchOnAuthor(books, searchName) {
    let nameSearchedBooks = [];
    for (let b of books) {
        let pos = b.author.toLowerCase().indexOf(searchName.toLowerCase());
        if (pos != -1) {
            nameSearchedBooks.push(b);
            continue;
        }
    }
    return nameSearchedBooks;
}
let booksListByAuthor = searchOnAuthor(books, "henry");
console.log(booksListByAuthor);
//function to find rating less than given value
function searchByRating(books, rating) {
    let ratingSearchedBooks = [];
    for (let b of books) {
        if (b.rating <= rating)
            ratingSearchedBooks.push(b);
    }
    return ratingSearchedBooks;
}
let ratingBooks = searchByRating(books, 6);
console.log(ratingBooks);
//function to search on price range
function searchByPrice(books, minPrice, maxPrice) {
    let priceSearchedBooks = [];
    for (let b of books) {
        if (b.price >= minPrice && b.price <= maxPrice)
            priceSearchedBooks.push(b);
    }
    return priceSearchedBooks;
}
let priceBooks = searchByPrice(books, 10, 50);
console.log(priceBooks);
