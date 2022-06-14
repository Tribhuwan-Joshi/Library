// Info Objects
const totalCount = document.querySelector("#total_books");
const readCount = document.querySelector("#total_read");
const unreadCount = document.querySelector("#total_unread");
const form = document.querySelector("form");
const table = document.querySelector("table").getElementsByTagName("tbody")[0];
table.textContent = "";

// Book constructor
function Book(bookId, title, author, pages, status) {
  this.bookId = bookId;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// hide new book form when clicked outside
document.addEventListener("click", () => {
  bookFormVisible = false;
  addBookForm.style.visibility = "hidden";
  form.reset();
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



// delete book eventListener

const deleteAll = document.querySelector("button#delete-all");
deleteAll.addEventListener("click", (e)=>{
  e.stopPropagation();
 
  if (table.textContent != "") {
    let response = confirm("Are you sure to delete all books?")
    if (response) {
      table.textContent = "";
    
    }
  }
  else {
    alert("No books to delete");
  }
})






// Book counters
let totalBooks = 0;
let readBooks = 0;
let unreadBooks = 0;

// new book form
const title = document.querySelector("form input#title");
const author = document.querySelector("form input#author");
const pages = document.querySelector("form input#pages");
const bookStatus = document.querySelector('input[name="status"]');

// renderBook function to render the book Object

function renderBook(book) {
  let htmlContent = `<tr>
                        <td>${book.bookId}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td class="status ${book.status}">${book.status}</td>
                        <td id="trash" title="remove this book"><img src="./icons/trash.png" alt=""></td>
                    </tr>`;
  let newRow = table.insertRow();
  newRow.innerHTML = htmlContent;
}

// Book array
let myLibrary = [];

// create new book object when clicked
const done = document.querySelector(".done button");
const ele = document.getElementsByName("status");
let bookId = 1;
done.addEventListener("click", () => {
  console.log(myLibrary);
  let statusValue = "";
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      statusValue = ele[i].value;
    }
  }

  if (
    title.value == "" ||
    author.value == "" ||
    pages.value == "" ||
    statusValue == ""
  ) {
    return;
  } else {
    let myBook = new Book(
      bookId,
      title.value,
      author.value,
      pages.value,
      statusValue
    );
    addBookToLibrary(myBook);
  }
  // reset the form and hide it
});

function addBookToLibrary(myBook) {
  myLibrary.push(myBook);
  console.log(myLibrary);

  renderBook(myBook);
  addBookForm.style.visibility = "hidden";
  bookFormVisible = false;
  form.reset();
}
