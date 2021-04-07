export class Book {
    constructor(bookID, title, author, price, rating, description, coverPhotoUrl = "URL not specified") {
        this.bookID = bookID;
        this.title = title;
        this.author = author;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.coverPhotoUrl = coverPhotoUrl;
    }
}
