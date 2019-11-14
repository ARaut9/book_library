/* Select Elements from dom */

const addBookForm = document.querySelector('.add-book');
const tableBody = document.querySelector('tbody');
const addBookFormBtn = document.querySelector('.add-book-btn');
const cancelBookFormBtn = document.querySelector('.cancel-btn');
const formContainer = document.querySelector('.form-container');

const books = JSON.parse(localStorage.getItem('books')) || [];

/* Functions */

function addBook(e) {
  e.preventDefault();

  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const readStatus = false;

  const book = { title, author, pages, readStatus };
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
  formContainer.classList.remove('show');
  this.reset();
}

function renderBooks() {
  tableBody.innerHTML = books.map((book, i) => {
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
          <input type='checkbox' id=${i} data-index=${i} ${books.readStatus ? 'checked' : ''}>
          <label for=${i}>
            ${book.readStatus ? '<i class="fas fa-check-square"></i>' : '<i class="far fa-check-square"></i>'}
          <label>
        </td>
        <td>
          <button data-index=${i}>
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function handleClick(e) {
  if (e.target.matches('input')) {
    const index = e.target.dataset.index;
    // toggle read status
    books[index].readStatus = !books[index].readStatus;
  } else if (e.target.parentNode.matches('button')) {
    const index = e.target.dataset.index;
    // delete book
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

renderBooks();