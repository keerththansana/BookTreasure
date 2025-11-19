function loadAllBooks(bookArray) { //this function load all books to books loading area
    $("#bookCardsContainer").empty();
    bookArray.forEach((record) => { //manipulate array send to the function using array
        let card = createBookCard(record); //create html card to append in loading are
        $("#bookCardsContainer").prepend(card); //append created card into loading area
    });
}

function createBookCard(record) { //use to create cards. using record data add data to card
    return `  <div class="col-lg-3 col-md-4 col-sm-12 mb-4">
              <div id="${record.isbnNo}" class="card h-100">
              <img style="width: 75%; height:auto; margin: auto;" src=${`data:image/jpg;base64,${record.image}`} class="card-img-top" alt="Book Cover">
              <div class="card-body">
                <h5 id="titleProduct${record.isbnNo}" class="card-title">${record.title}</h5>
                <p class="card-text">${record.author}</p>
                <p class="card-text text-danger">Rs.${record.price}</p>
              </div>
              <div class="card-footer ">
               <div class="row g-3">
               <div class="col-12 col-xl-6">
               <input id="inputProduct${record.isbnNo}" width="50%" min="0" type="number" class="form-control" placeholder="Enter Qty" aria-describedby="button-addon2"></input>
                </div>
               <div class="col-12 col-xl-6">
               <button id="btnAddProduct${record.isbnNo}" class="btn btn-outline-dark form-control" type="button" onclick="addToCart(${record.isbnNo},${record.price});">ADD TO CART</button>
               </div>
              </div>
              </div>
            </div>
          </div>`;
}


$('#txtSearchBook').on('keyup', function () {//keyup function for search book by author or book name
    if (!$('#txtSearchBook').val()) {//check input field is empty
        loadAllBooks(books);
    } else {
        let arr = [];//new array to add filtered books
        let text = $('#txtSearchBook').val();//get the value from text field
        books.forEach((book) => {//search through books array
            if (book.title.toLowerCase().includes(text.toLowerCase()) || book.author.toLowerCase().includes(text.toLowerCase())) {
                arr.push(book);//add books matching with searching keywords to new array
            }
        });
        loadAllBooks(arr);//load all books using new filtered array
    }
});

function filterBook() {//filter books according to the book type
    let result = books.filter(filterByType);//filter book array according tho the given type
    if (result.length === 0) {
        alert("No book found for this type!!");
    } else {
        loadAllBooks(result);//load books using filtered array
    }
}

function filterByType(book) {// use to filter array according to type
    let text = $("#bookTypeFilter option:selected").text();
    return book.type.toLowerCase().includes(text.toLowerCase());
}

function clearFilters() {//clear filters and load all books
    loadAllBooks(books);
    $('#txtSearchBook').val("");
    $("#bookTypeFilter").prop('selectedIndex', -1);
}

getAllBooks();//load all books when web page loading