$(document).ready(function () {

 
    //Create array of animal buttons
    var topics = ["Dog", "Cat", "Horse", "Owl", "Bear", "Bird"];
    console.log("These are the topics: " + topics);

    //Give each item in the array a button.
    function renderButton () {
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("btn btn-default");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#animalButtons").append(newButton);
        }
        console.log(newButton);
    };

    //Create Event Listener for all button elements
    $(document).on("click", ".btn", function (event) {
        event.preventDefault();
        console.log("working");
        //Creating variable to hold button that was clicked and assigning data-name attribute from the button in the previous function.
        var animalGif = $(this).attr("data-name");

        //Creating URL to search Giphy for the animal inputted by the user
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=2D2bvWjIpa5c1hnfkWMfda6UcvyiZ6Ep&limit=5";

        //Performing AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        //After data comes back from the API
        .then(function(response) {
        console.log(response);
            $("#returnAnimals").empty();
            var gifResults = response.data;
            for (var i = 0; i < gifResults.length; i++) {
                if (gifResults[i].rating !== "r")

                //Create div element to hold results
                var gifDiv = $("<div class='item'></div>");

                //Assign rating of gif to variable
                var gifRating = `<h4>Rating: ${gifResults[i].rating.toUpperCase()}</h4>`;

                //Get the source of the image with API 
                var stillGifImage = $("<img src='" + gifResults[i].images.fixed_height_still.url + "'>");
                stillGifImage.addClass("gif");

                //Add image element to hold gif results
                var imageDiv = $("<div>");
                imageDiv.addClass("animate");
                imageDiv.attr("data-state", "still");
                imageDiv.attr("data-name", "topic");
                imageDiv.attr("data-still", gifResults[i].images.fixed_height_still.url);
                imageDiv.attr("data-animate",gifResults[i].images.fixed_height.url);

                //Append gifImage and gifRating to the gif results div
                gifDiv.append(stillGifImage)
                gifDiv.append(gifRating)

                //Prepending the gifDiv to the return animals div in the HTML
                $("#returnAnimals").prepend(gifDiv);
            }

        });

    });

    //Create function to animate gifs
    function animateGif () {
        var state = $(this).attr("data-state");
        console.log("This is the state: " + state);
        if (state === "still") {
            $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
            $(this).attr("data-state", "animate");
            
        } else {
			$(this).html("<img src='" + $(this).attr("data-still") + "'>");
			$(this).attr("data-state", "still");
		}
   };

    renderButton();
    $(document).on("click", ".gif", animateGif);
});