// Info Objects
const totalCount = document.querySelector("#total_books");
const readCount = document.querySelector("#total_read");
const unreadCount = document.querySelector("#total_unread");


// hide new book form when clicked outside
document.addEventListener("click", () => {
  bookFormVisible = false;
  addBookForm.style.visibility = "hidden";
});


// new book form
const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("click", (e) => {
  e.stopPropagation();
});
let bookFormVisible = false;


// add book eventlistner
const addBook = document.querySelector("button#add-book");
addBook.addEventListener("click", (e) => {
  e.stopPropagation();
  if (bookFormVisible) return;

  addBookForm.style.visibility = "visible";
  bookFormVisible = true;
});



// Book counters
let totalBooks = 0;
let readBooks = 0;
let unreadBooks = 0;


// new book form
const title = document.querySelector("form input#title");
const author = document.querySelector("form input#author");
const pages = document.querySelector("form input#pages");
const bookStatus = document.querySelector('input[name="status"]:checked');
  
let arr = [title, author, pages, bookStatus];
arr.forEach(function (ele) {
  ele.addEventListener("input", () => {
    ele.setCustomValidity("");
    ele.checkValidity();
  })
});

title.addEventListener("invalid", () => {
  title.setCustomValidity("Please provide the title.");
})
author.addEventListener("invalid", () => {
  author.setCustomValidity("Please provide author name.");
});
pages.addEventListener("invalid", () => {
  title.setCustomValidity("Please provide number of pages.");
});
bookStatus.addEventListener("invalid", () => {
  title.setCustomValidity("Have you read it or not ?.");
});




// Done button
const done = document.querySelector("input#done");

done.addEventListener('click', () => {
  console.log("title = " , title.value,"\n","author = " ,author.value, "\n","pages = " ,pages.value);
})









// Book constructor

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  
}

function addBookToLibrary() {
  
}


let myLibrary = [];


