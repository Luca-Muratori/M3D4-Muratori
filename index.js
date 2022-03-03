const booksWrapper = document.querySelector("#books-wrapper");
const shoppingCart = document.querySelector("#shopping-cart");

window.onload = () => {
  loadBooks();
};

let books = [];

let shoppingCartList = [];

let filteredBooks = [];

function loadBooks() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((r) => r.json())
    .then((_books) => {
      books = _books;
      console.log(books);
      displayBooks();
    })
    .catch((err) => console.error(err.message));
}

function displayBooks(_books = books) {
  booksWrapper.innerHTML = "";

  _books.forEach((book) => {
    booksWrapper.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card">
                <img src="${book.img}" class="img-fluid card-img-top" alt="${
      book.title
    }">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">${book.category}</p>
                  <button class="btn btn-primary" onclick="addToCart('${String(
                    book.asin
                  )}', this)">$${book.price}</button>
                  <button class="btn btn-warning" onclick="this.closest('.col-12').remove()">
                    Skip me
                  </button>
                </div>
              </div>
            </div>
          `;
  });
}

function addToCart(asin, element) {
  console.log(asin);
  const book = books.filter((book) => book.asin === asin)[0];
  shoppingCartList.push(book);
  console.log(shoppingCartList);

  refreshShoppingCart();

  element.closest(".card").classList.add("selected");
}

function refreshShoppingCart() {
  shoppingCart.innerHTML = "";

  shoppingCartList.forEach((book) => {
    shoppingCart.innerHTML += `
    <div class='col-lg-2 col-md-3'>
        <div class="shopping-item ">
            <div>
                ${book.title}
            </div>
            <div>
                $${book.price}
            </div>
            <div class='footer-itemCart'>
                <div>
                    <button class="btn btn-danger" onclick="deleteItem('${String(
                      book.asin
                    )}')">Delete </button>
                </div>
                <img  class='img-cart' src="${book.img}"/>
            </div>

        </div>
    </div>
          `;
  });
}

function search(query) {
  if (query.length < 3) {
    filteredBooks = books;
    displayBooks();
    return;
  }

  filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredBooks);
  displayBooks(filteredBooks);
}

function deleteItem(asin) {
  const index = shoppingCartList.findIndex((book) => book.asin === asin);

  if (index !== -1) {
    shoppingCartList.splice(index, 1);
  }

  refreshShoppingCart();
}
