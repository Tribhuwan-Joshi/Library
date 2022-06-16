const form = document.querySelector("form");
const table = document.querySelector("table").getElementsByTagName("tbody")[0];
table.textContent = "";

// Book constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// new book form
const title = document.querySelector("form input#title");
const author = document.querySelector("form input#author");
const pages = document.querySelector("form input#pages");
const bookStatus = document.querySelector('input[name="status"]');

// Book array
let myLibrary = [];

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
  title.focus();
});

// delete book eventListener

const deleteAll = document.querySelector("button#delete-all");
deleteAll.addEventListener("click", (e) => {
  e.stopPropagation();

  if (table.textContent != "") {
    let response = confirm("Are you sure to delete all books?");
    if (response) {
      table.textContent = "";
      myLibrary = [];
      resetInfoData();
    }
  }
});

// renderBook function to render the book Object

function renderBook() {
  table.textContent = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let htmlContent = `<tr>
                        <td>${i + 1}</td>
                        <td>${myLibrary[i].title}</td>
                        <td>${myLibrary[i].author}</td>
                        <td>${myLibrary[i].pages}</td>
                        <td class="status ${
                          myLibrary[i].status
                        }" data-Id=${i}>${myLibrary[i].status}</td>
                        <td id="trash" title="remove this book" data-Id=${i}><img src="./icons/trash.png" alt=""></td>
                    </tr>`;
    let newRow = table.insertRow();
    newRow.innerHTML = htmlContent;
  }
}

// Book counters
let totalBooks = 0;
let readBooks = 0;
let unreadBooks = 0;

// update info data
const totalContainer = document.querySelector("#total_books");
const readContainer = document.querySelector("#total_read");
const unreadContainer = document.querySelector("#total_unread");

function updateInfo() {
  totalContainer.textContent = totalBooks;
  readContainer.textContent = readBooks;
  unreadContainer.textContent = totalBooks - readBooks;
}

//reset info data
function resetInfoData() {
  totalContainer.textContent = 0;
  readContainer.textContent = 0;
  unreadContainer.textContent = 0;

  totalBooks = readBooks = unreadBooks = 0;
}

function addBookToLibrary(myBook) {
  myLibrary.push(myBook);
  renderBook();
  form.reset();
  addBookForm.style.visibility = "hidden";
  bookFormVisible = false;
}


// create new book object when clicked
const done = document.querySelector(".done button");
const ele = document.getElementsByName("status");
let statusContainer;


// toggle status

function toggleStatus() {
  statusContainer.forEach((sc) => {
    sc.addEventListener('click', (e) => {
      let index = e.target.getAttribute('data-Id');
      let textContent = e.target.textContent;
      if (textContent == "Read") {
        e.target.textContent = "Unread";
        e.target.style.backgroundColor = "rgb(253, 155, 70)";
        myLibrary[index].status = "Unread";
        readBooks--;

      }
      else {
        e.target.textContent = "Read";
        e.target.style.backgroundColor = "rgb(125, 243, 131)";
        myLibrary[index].status = "Read";
        readBooks++;
      }
      updateInfo();
    })
  })
}


done.addEventListener("click", () => {
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
    alert("Please enter all the details ! ");
    title.focus();

    return;
  } else {
    if (statusValue == "Read") {
      readBooks++;
    } else {
      unreadBooks++;
    }

    totalBooks++;

    // update info data
    updateInfo();
    
    let myBook = new Book(title.value, author.value, pages.value, statusValue);
    addBookToLibrary(myBook);

    statusContainer = document.querySelectorAll('table .status');

    toggleStatus();
  
  }
});



