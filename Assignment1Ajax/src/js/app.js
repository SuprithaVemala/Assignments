
let divID = document.getElementById("body");
//listener for displaying table

async function booklist(term,val) {
  let uri = "http://localhost:3000/books";
  if(term==="author" || term==="title"){
    uri+=`?${term}_like=${val}`
  }
  if(term==="id"){
    uri+=`?${term}=${val}`
  }
  if(term==="rating"){
    uri+=`?${term}_lte=${val}`
  }
  if(term==="price"){
    let pricelimits=val.split(' ')
    uri+=`?${term}_lte=${pricelimits[1]}&${term}_gte=${pricelimits[0]}`
  }
  let result = await fetch(uri);
  let books = await result.json();
  let bookTable = document.getElementById("bookTable");
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
    let tableRow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td4.setAttribute("bookid",b.id)
    let btn = document.createElement("button");
    let btndetails = document.createElement("button");
    //add content
    td1.textContent = title;
    td2.textContent = author;
    td3.textContent = rating.toString();
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" title="delete book" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>`;
    btndetails.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" title="view book details" fill="currentColor" class="bi bi-book-half" viewBox="0 0 16 16">
      <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
    </svg>`;
    btn.title = "delete book";
    btndetails.title = "view book details";
    //add styling
    tableRow.classList.add("bodyRow");
    td1.classList.add("table_data");
    td2.classList.add("table_data");
    td3.classList.add("table_data");
    td4.classList.add("table_data");
    btn.classList.add("button");
    btn.classList.add("delete");
    btndetails.classList.add("button");
    btndetails.classList.add("details");
    //apend childern
    td4.appendChild(btndetails);
    td4.appendChild(btn);
    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    tableRow.appendChild(td3);
    tableRow.appendChild(td4);
    //apend table row to table
    bookTable.appendChild(tableRow);
  }
}

function searchOptions(){
  let searchBtn = document.getElementById("search");
  searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener('click', function (e) {
    let option = document.getElementById("displayOptions");
    let value = option.value;
    let searchVal = document.getElementById('searchBar');
    let searchval = searchVal.value;
    switch (value) {
        case "id":
            if (searchval != null) {
              booklist("id",searchval)
            }
            break;
        case "title":
            if (searchval != null) {
              booklist("title",searchval)
            }
            break;
        case "author":
            if (searchval != null) {
              booklist("author",searchval)
            }
            break;
        case "rating":
            if (searchval != null) {
              booklist("rating",searchval)
            }
            break;
        case "price":
            if (searchval != null) {
              booklist("price",searchval)
            }
            break;
    }
});
}

function indexPageContent(){
  fetch("././views/_booklist.html")
  .then(function (response){
    return response.text()
  })
  .then(function(table){
    divID.innerHTML = table;
    booklist()
    searchOptions()
    let tableid=document.getElementById("bookTable")
    if(table)
    tableid.addEventListener('click',async (e)=>{
      let id=e.target.parentElement.getAttribute("bookid")
      if(e.target.classList.contains("details"))
      {
        fetch("././views/_bookdetails.html")
        .then(response=>{
          return response.text()
        })
        .then(async (div)=>{
          divID.innerHTML=div
          let uri = "http://localhost:3000/books/"+id;
          let result = await fetch(uri);
          let book = await result.json();
          document.getElementById("title").innerHTML=book.title
          document.getElementById("author").innerHTML+=book.author
          document.getElementById("description").innerHTML=book.description
          document.getElementById("pages").innerHTML+=book.pages
          document.getElementById("price").innerHTML+=`${book.price} rupees`
          document.getElementById("rating").innerHTML+=book.rating
        })
      }
      if(e.target.classList.contains("delete"))
      {
        let res=await fetch('http://localhost:3000/books/'+id,{
          method:'DELETE'
        })
        /* window.location.replace('././index.html') */
        indexPageContent()
      }
    })
    

  })
  .catch(e=>{
    console.log(e)
  })
}
window.addEventListener("DOMContentLoaded", () => {
  indexPageContent()
});

document.getElementById("list").addEventListener('click',()=>{
  indexPageContent()
})
let btnIDForAddBooks = document.getElementById("add");
btnIDForAddBooks.addEventListener("click", (e) => {
  fetch("././views/_bookadd.html")
    .then(function (response) {
      return response.text();
    })
    .then(function (form) {
      divID.innerHTML = form;
      let form1 = document.getElementById("addBookForm");
      if (form1) {
        form1.addEventListener("submit", async (e) => {
          e.preventDefault();
          let title = document.getElementById("title");
          let author = document.getElementById("authorName");
          let rating = document.getElementById("rating");
          let price = document.getElementById("price");
          let details = document.getElementById("description");
          let coverURL = document.getElementById("coverPhotoURL");
          let book = {
            title: title.value,
            author: author.value,
            price: price.value,
            rating: rating.value,
            votes: 0,
            description: details.value,
            cover: coverURL.value
          };
          console.log(book);
          try {
            await fetch("http://localhost:3000/books", {
              method: "POST",
              body: JSON.stringify(book),
              headers: { "Content-Type": "application/json" },
            });
            window.alert("Book added sucessfully");
            /* window.location.replace("././index.html"); */
            indexPageContent()
          } catch (e) {
            console.log(e);
          }
        });
      } else console.log("no form");
    })
    .catch((e) => {
      console.log(e);
    });
});
