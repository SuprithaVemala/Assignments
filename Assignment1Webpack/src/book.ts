export class Book{
    bookID:number;
    title:string;
    author:string;
    price:number;
    rating:number;
    description:string;
    coverPhotoUrl:string;

    constructor(bookID:number, title:string, author:string, price:number, rating:number, description:string, coverPhotoUrl:string="URL not specified"){
        this.bookID=bookID;
        this.title=title;
        this.author=author;
        this.price=price;
        this.rating=rating;
        this.description=description;
        this.coverPhotoUrl=coverPhotoUrl;
    }
    
}