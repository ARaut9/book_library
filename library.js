let myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    readStatus: false,
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 150,
    readStatus: false,
  },
];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary(event) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read");
  let readStatus;

  if(read.checked) {
    readStatus = true;
  } else {
    readStatus = false;
  }

  let book = new Book(title, author, pages, readStatus);

  myLibrary.push(book);

  render();

  formContainer.classList.remove("show");
  formContainer.classList.add("hidden");
  
  event.preventDefault();
}

function render() {
  const tableBody = document.querySelector("tbody");

  if (tableBody.children.length > 0) {
    while (tableBody.children.length !== 0) {
      tableBody.removeChild(tableBody.lastChild);
    }
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const tableRow = document.createElement("tr");
    const bookNo = document.createElement("td");
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const readStatus = document.createElement("td");
    const deleteElement = document.createElement("td");
    const deleteButton = document.createElement("button");

    tableBody.appendChild(tableRow);
    tableRow.setAttribute("data-index", `${i}`);
    tableRow.appendChild(bookNo);
    tableRow.appendChild(title);
    tableRow.appendChild(author);
    tableRow.appendChild(pages);
    tableRow.appendChild(readStatus);
    tableRow.appendChild(deleteElement);
    deleteElement.appendChild(deleteButton);
    deleteButton.style.width = '30px';
    deleteButton.style.height = '30px';
    deleteButton.style.border = '0';
    deleteButton.style.background = '#fff url("icons/delete.png") no-repeat center center';
    deleteButton.style.backgroundSize = '100%';

    bookNo.innerHTML = `${i + 1}`;
    title.innerHTML = `${myLibrary[i].title}`;
    author.innerHTML = `${myLibrary[i].author}`;
    pages.innerHTML = `${myLibrary[i].pages}`;

    if (myLibrary[i].readStatus) {
      readStatus.style.background = '#fff url("icons/toggle-on.png") no-repeat center center';
    } else {
      readStatus.style.background = '#fff url("icons/toggle-off.png") no-repeat center center';
    }

    readStatus.style.backgroundSize = '35px';

    readStatus.addEventListener("click", () => {
      if (myLibrary[i].readStatus) {
        myLibrary[i].readStatus = false;
      } else {
        myLibrary[i].readStatus = true;
      }
    
      render();
    });
    

    deleteButton.addEventListener("click", (event) => {
      let deleteRowIndex = event.target.parentElement.parentElement.getAttribute("data-index");
      deleteBook(deleteRowIndex);
    });
  }
}

const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", addBookToLibrary);

const addBookBtn = document.querySelector("#add-book-btn");
const formContainer = document.querySelector("#form-container");
addBookBtn.addEventListener("click", () => {
  if (formContainer.classList.value === "hidden") {
    formContainer.classList.remove("hidden");
    formContainer.classList.add("show");
  }
});

const cancelBookForm = document.querySelector("#cancel-btn");
cancelBookForm.addEventListener("click", () => {
  if (formContainer.classList.value === "show") {
    formContainer.classList.remove("show");
    formContainer.classList.add("hidden");
  }
});

render();

function deleteBook(index) {
  myLibrary.splice(index, 1);
  render();
}