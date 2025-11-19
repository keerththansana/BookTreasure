async function saveOrder(order){//send post request to backend for save order
    
    try {
        fetch(`${baseUrl}/order`, {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(order) // Convert the data to JSON format
        })
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                console.log('Success:', data); // Handle the success response
                alert(data.message)
                $('#paymentForm').trigger("reset");
                location.reload(true);
            })
            .catch(error => {
                console.error('Error:', error); // Handle any errors
                alert(error);
            });

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}