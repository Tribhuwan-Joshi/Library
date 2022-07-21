const form = document.querySelector("form");
const table = document.querySelector("table").getElementsByTagName("tbody")[0];
table.textContent = "";

// Book constructor
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// new book form
const title = document.querySelector("form input#title");
const author = document.querySelector("form input#author");
const pages = document.querySelector("form input#pages");
const bookStatus = document.querySelector('input[name="status"]');

// Book counters
let totalBooks = 0;
let readBooks = 0;
let unreadBooks = 0;

// update info data
const totalContainer = document.querySelector("#total_books");
const readContainer = document.querySelector("#total_read");
const unreadContainer = document.querySelector("#total_unread");

// Book array
let myLibrary = [];
const done = document.querySelector(".done button");
const ele = document.getElementsByName("status");
let statusContainer;
let removeContainer;

function updateContainers() {
  statusContainer = document.querySelectorAll("table .status");
  removeContainer = document.querySelectorAll("img#trash");
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
      statusContainer = null;
      removeContainer = null;
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
                        <td class="status ${myLibrary[i].status
      }" data-Id=${i}>${myLibrary[i].status}</td>
                        <td  title="remove this book" ><img src="./icons/trash.png"  id="trash" data-Id=${i} alt=""></td>
                    </tr>`;
    let newRow = table.insertRow();
    newRow.innerHTML = htmlContent;
  }
}

function updateInfo() {
  totalContainer.textContent = totalBooks;
  readContainer.textContent = readBooks;
  unreadBooks = totalBooks - readBooks;
  unreadContainer.textContent = unreadBooks;
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

// add eventListener

function addEventListeners() {
  toggleStatus();
  removeBook();
}

// toggle status

function toggleStatus() {
  statusContainer.forEach((sc) => {
    sc.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-Id");
      let textContent = e.target.textContent;
      if (textContent == "Read") {
        e.target.textContent = "Unread";
        e.target.style.backgroundColor = "rgb(253, 155, 70)";
        e.target.classList.remove("Read");
        e.target.classList.add("Unread");
        myLibrary[index].status = "Unread";

        readBooks--;
      } else {
        e.target.textContent = "Read";
        e.target.style.backgroundColor = "rgb(125, 243, 131)";
        myLibrary[index].status = "Read";
        e.target.classList.remove("Unread");
        e.target.classList.add("Read");
        readBooks++;
      }
      // statusContainer = document.querySelectorAll("table .status");
      updateContainers();
      updateInfo();
    });
  });
}

// Remove Book
function removeBook() {
  removeContainer.forEach((rc) => {
    rc.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-Id");

      if (myLibrary[index].status == "Read") {
        readBooks--;
      }
      totalBooks--;

      myLibrary.splice(index, 1);
      updateInfo();
      renderBook();
      // removeContainer = document.querySelectorAll("img#trash");
      updateContainers();
      addEventListeners();
    });
  });
}

// Event listener to add new book
done.addEventListener("click", () => {
  let statusValue = "";
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      statusValue = ele[i].value;
    }
  }

  let titleValue = title.value
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  let authorValue = author.value
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  if (
    titleValue == "" ||
    authorValue == "" ||
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

    let myBook = new Book(titleValue, authorValue, pages.value, statusValue);
    addBookToLibrary(myBook);
    updateContainers();
    // statusContainer = document.querySelectorAll("table .status");
    // removeContainer = document.querySelectorAll("img#trash");

    removeBook();
    toggleStatus();
  }
});
