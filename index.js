//fetch the books data and display on the page

const main = document.querySelector("#mainContainerBook");
const shoppingArea = document.querySelector("#shoppingCart");
shoppingArea.innerHTML = `
      <h3 id='title'>Shopping Cart</h3>
  `;

const fetchBook = () => {
  const fetchData = fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("col-lg-3");
        col.classList.add("col-md-4");
        col.innerHTML = `
            <div class="card" >
                <img src=${book.img} class="card-img-top" alt="book-cover">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.price} $</p>
                    <a href="#" onclick=addToCart(event) class="btn btn-primary">Add to cart</a>
                    <a href="#" onclick=skipBook(event) class="btn btn-danger">Skip this book</a>
                </div>
            </div>
          `;
        main.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};
//create the cart and add ll the function
let bookArrCart = [];
const addToCart = (e) => {
  let book = e.target.closest(".card");
  bookArrCart.push(book);
  book.classList.add("selected");
  //   bookArrCart.push(e);
  console.log(bookArrCart);
};

//skip the book, when clicked in the btn
const skipBook = (e) => {
  let col = e.target.closest(".col");
  col.remove();
};

window.onload = () => {
  fetchBook();
};
