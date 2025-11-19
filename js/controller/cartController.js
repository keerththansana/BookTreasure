

function addToCart(isbnNo, productPrice) {// this work when add to cart button clicked
  let qty = parseInt($(`#inputProduct${isbnNo}`).val());//get entered quantity

  if (qty === 0 || isNaN(qty) || qty < 0) {//check entered quantity valid or not
    alert("You need to add valid product quantity!!!");
    $(`#inputProduct${isbnNo}`).val('');
  } else {
    let e = itemIsExists(isbnNo);// check selected item already in cart
    if (e.exist) {// if already in cart
      let unitPrice = cart[e.index].price / cart[e.index].quantity//calculate unit price
      cart[e.index].quantity += qty;//update quantity
      cart[e.index].price = (cart[e.index].quantity) * (unitPrice);//update price
    } else {//if item not in cart
      let name = $(`#titleProduct${isbnNo}`).text();
      let tot = productPrice * qty;

      let item = {//create item object
        "bookName": name,
        "isbnNo": isbnNo,
        "quantity": qty,
        "price": tot
      }
      cart.push(item);// add created item to catt array
    }

    $(`#inputProduct${isbnNo}`).val('');//clear input field
    $("#checkOutBtn").removeAttr('disabled');//enable checkout button
    loadCartItems();//load cart items
    updateCartTotal();//update cart total
    console.log(cart);
  }
}

function updateCartTotal() {// use to display cart total, no of total items in cart
  let t = calculateCartTotal();
  $("#floatBtnBadge").text(t.totalItems);
  $("#lblTotalItems").text(t.totalItems);
  $("#lblSubTotal").text(t.total);
}

function calculateCartTotal() {//calculate cart total price and total items
  let total = 0;
  let totalItems = 0;
  cart.forEach(e => {//go through cart array
    totalItems += parseInt(e.quantity);//calculate total items
    total += e.price;// calculate total price
  });
  return { "total": total, "totalItems": totalItems }; //return it as a object
}

function removeCartItem(isbnNo) {//remove cart item function
  cart.forEach((i) => {//search in cart array using isbn number
    if (i.isbnNo === isbnNo) {
      let index = cart.indexOf(i)
      cart.splice(index, 1);//remove particular object from array
    }
  });
  console.log(cart);
  if (cart.length === 0) {//check if nothing in cart
    $("#checkOutBtn").attr('disabled', 'disabled');//if nothing in cart disable checkout button
  }
  loadCartItems();//load cart items after remove item
  updateCartTotal();//update cart total after remove item
}

function loadCartItems() {//load all items in cart array
  $("#cartList").empty();//empty cart area
  cart.forEach((i) => {//go through cart array and create cart items and append to cart area
    let iPrice = i.price / i.quantity;
    let item = `
    <a  class="list-group-item list-group-item-action  aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${i.bookName}</h5>
        <span id="removeCartItem${i.isbnNo}" class="badge"><button type="button" class="btn btn-outline-danger rounded-pill"  onclick="removeCartItem(${i.isbnNo});"><i class="bi bi-trash"></i></button></span>
      </div>
    <p  class="mb-1">  <small>Rs.${iPrice}.00.</small><span class="fs-5"> x  ${i.quantity}</span></p>
      <small>Rs.${i.price}.00</small>
    </a>`;
    $("#cartList").prepend(item);
  });
}

function itemIsExists(pId) {//check if items already exists in cart array
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].isbnNo === pId) {
      return { "exist": true, "index": i };// If exists send object with particular index in array
    }
  }
  return { "exist": false, "index": null };
}