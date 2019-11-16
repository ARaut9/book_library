/* Select Elements from dom */

const addBookForm = document.querySelector('.add-book');
const tableBody = document.querySelector('tbody');
const addBookFormBtn = document.querySelector('.add-book-btn');
const cancelBookFormBtn = document.querySelector('.cancel-btn');
const formContainer = document.querySelector('.form-container');
const bookFilter = document.querySelector('.book-filter');

bookFilter.selectedIndex = 0;
let filterValue = 'all';
const books = JSON.parse(localStorage.getItem('books')) || [];

/* Functions */

let counter = 0;
function getUID() { // to genrate unique id's
  return (Date.now() + Math.round(Math.random() * 9) + counter++).toString();
}

function addBook(e) {
  e.preventDefault();

  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const readStatus = false;

  const book = { id: getUID(), title, author, pages, readStatus };
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
  formContainer.classList.remove('show');
  this.reset();
}

function filterBooks(filterValue) {
  if (filterValue === 'read') {
    return books.filter(book => book.readStatus === true);
  } else if (filterValue === 'not-read') {
    return books.filter(book => book.readStatus !== true);
  }
  return books;
}

function renderBooks() {
  const booksToRender = filterBooks(filterValue);
  tableBody.innerHTML = booksToRender.map((book, i) => {
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
          <input type='checkbox' id=${book.id} data-id=${book.id} ${book.readStatus ? 'checked' : ''}>
          <label for=${book.id}>
            ${book.readStatus ? '<i class="fas fa-check-square"></i>' : '<i class="far fa-check-square"></i>'}
          <label>
        </td>
        <td>
          <button data-id=${book.id}>
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function handleClick(e) {
  const id = e.target.parentNode.dataset.id;
  const book = books.find(book => book.id === id);

  if (e.target.matches('input')) {
    // toggle read statu
    book.readStatus = !book.readStatus;
  } else if (e.target.parentNode.matches('button')) {
    // delete book
    const index = books.indexOf(book);
    books.splice(index, 1);
  } else {
    return;
  }
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
}

/* Event Listeners */

addBookForm.addEventListener('submit', addBook);
tableBody.addEventListener('click', handleClick);
addBookFormBtn.addEventListener('click', () => formContainer.classList.add('show'));
cancelBookFormBtn.addEventListener('click', () => {
  formContainer.classList.remove('show');
  addBookForm.reset();
});
bookFilter.addEventListener('change', () => {
  const index = bookFilter.selectedIndex;
  const options = bookFilter.options;
  filterValue = options[index].value;
  renderBooks();
});

renderBooks();