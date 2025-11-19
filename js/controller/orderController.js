function placeOrder() {

    if (cusName === '' || address === '' || contact === '') {
        alert("Please fill all fields");
    } else {
        let calculate = calculateCartTotal();// calculate total 
        let today = new Date();// create date object
        const year = today.getFullYear();//get year from date object
        const month = String(today.getMonth() + 1).padStart(2, '0'); //get month from date object. Months are zero-based, so add 1 and pad with zero if needed
        const day = String(today.getDate()).padStart(2, '0')//get day from date object
        const formattedDate = `${year}-${month}-${day}`;//create formatted date

        var forOID = today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
        let oderId = "OD" + cart.length + "" + forOID;//create order id using cart length can current time
        let total = calculate.total;//set cart total
        let orderDate = formattedDate;//set date
        let cusName = $("#customerName").val();//set customer name
        let address = $("#address1").val() + "," + $("#address2").val() + "," + $("#address3").val() + "," + $("#address4").val();
        let contact = $("#contactNumber").val();//set contact number

        let order = {//create object
            "orderId": oderId,
            "orderDate": orderDate,
            "totalCost": total,
            "shippingAddress": address,
            "userMobileNumber": contact,
            "orderDetails": cart
        };
        saveOrder(order);//send created object to save order function to send to backend

    }
}