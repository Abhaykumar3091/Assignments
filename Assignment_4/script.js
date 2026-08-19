let seatsAvailable = true;

let booking = new Promise((resolve, reject) => {

    // Use setTimeout() to simulate an asynchronous booking process
    setTimeout(() => {

        if (seatsAvailable) {
            resolve("Seats are available.");
        } else {
            reject("No Seats Available.");
        }

    }, 2000);
});

// 1. Check Seat Availability
booking
    .then((result) => {
        console.log("1. Check Seat Availability:", result);

        // Pass the result to the next .then()
        return "Seat availability checked successfully.";
    })

    // 2. Process Payment
    .then((result) => {
        console.log("2. Process Payment:", result);

        // Pass the result to the next .then()
        return "Payment processed successfully.";
    })

    // 3. Confirm Booking
    .then((result) => {
        console.log("3. Confirm Booking:", result);

        // Pass the result to the next .then()
        return "Booking confirmed successfully.";
    })

    // 4. Generate Ticket
    .then((result) => {
        console.log("4. Generate Ticket:", result);

        return "Movie ticket generated successfully.";
    })

    // Display the final result
    .then((result) => {
        console.log("Final Result:", result);
    })

    // Handle errors such as "No Seats Available"
    .catch((error) => {
        console.log("Booking Error:", error);
    });