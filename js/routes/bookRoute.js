async function getAllBooks() {//get all books from backend
    try {
        fetch(`${baseUrl}/book`, {
            "method": "GET",// Specify the method
            "headers": {
                "Content-Type": "application/json;"// Set the content type to JSON
            }
        })
            .then(response => {
                if (!response.ok) {// Handle HTTP errors
                    throw new Error('Network response was not ok ' + response.message);
                }
                return response.json(); // Parse the JSON response
            })
            .then(responseData => {// Handle the success response
                books = responseData.data;
                loadAllBooks(books);
            })
            .catch(error => {// Handle any errors
                console.error('There was a problem with the fetch operation:', error);
            });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}