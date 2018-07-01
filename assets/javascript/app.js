$(document).ready(function () {

 
    //Create array of animal buttons
    var topics = ["Dog", "Cat", "Horse", "Owl", "Bear", "Bird", "Lion", "Panda", "Squirrel", "Fox", "Giraffe", "Zebra", "Pig"];
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

    //Add new button from form
   $("#userSubmit").on("click", function (event) {
        console.log("This is the event function" + event);
        event.preventDefault();
        var animalGif = $("#userInput").val().toLowerCase().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=2D2bvWjIpa5c1hnfkWMfda6UcvyiZ6Ep&limit=10";
        console.log("this is the User Input Animal: " + animalGif);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
     
        //After data comes back from the API
        .then(function(response) {
            var gifResults = response.data;
            var form = document.getElementById("animalForm");


            if (gifResults.length == 0) {
                alert("Sorry, there are no GIFs found for this topic.");
                console.log("This is the Response Data Length: " + gifResults.length);
            }
            else if (topics.indexOf(animalGif) > -1) {
                alert ("This topic already exists!");
                console.log("This is the Else if Topics: " + topics);
                console.log("Else if Statement: " + animalGif.indexOf(topics) > -1);
            } 
            else {
                topics.push(animalGif);
                $("#animalButtons").html("");
                renderButton();  
                console.log("This is the array " + topics); 
                form.reset();
            }
        });
    });

    //Create Event Listener for all button elements
    $(document).on("click", ".btn", function (event) {
        event.preventDefault();
        console.log("working");
        //Creating variable to hold button that was clicked and assigning data-name attribute from the button in the previous function.
        var animalGif = $(this).attr("data-name");

        //Creating URL to search Giphy for the animal inputted by the user
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=2D2bvWjIpa5c1hnfkWMfda6UcvyiZ6Ep&limit=10";

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

                // //Get the source of the image with API 
                // var stillGifImage = $("<img src='" + gifResults[i].images.fixed_height_still.url + "'>");
                // stillGifImage.addClass("gif");

                //Add image element to hold gif results
                var imageDiv = $("<img>");
                imageDiv.addClass("gif");
                imageDiv.attr("id", i);
                imageDiv.attr("src", gifResults[i].images.fixed_height_still.url);
                imageDiv.attr("data-state", "still");
                imageDiv.attr("data-name", "topic");
                imageDiv.attr("data-still", gifResults[i].images.fixed_height_still.url);
                imageDiv.attr("data-animate", gifResults[i].images.fixed_height.url);

                console.log("This is our animate url " + gifResults[i].images.fixed_height.url);
                //Append gifImage and gifRating to the gif results div
                gifDiv.append(imageDiv);
                gifDiv.append(gifRating);

                //Prepending the gifDiv to the return animals div in the HTML
                $("#returnAnimals").prepend(gifDiv);
            }

        });

        console.log(queryURL);

    });

    //Create function to animate gifs
    function animateGif () {
        console.log($(this));
        var state = $(this).attr("data-state");
        console.log("This is the state: " + state);
        if (state === "still") {
            console.log("hello");
            console.log("animate " + $(this).attr("data-animate"));
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            // $(".gif").html("<img src='" + $(".gif").attr("data-animate") + "'>");
            // $(".gif").attr("data-state", "animate");
            
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("still " + $(this).attr("data-still"));
			// $(".gif").html("<img src='" + $(".gif").attr("data-still") + "'>");
			// $(".gif").attr("data-state", "still");
		}
   };
   
    $(document).on("click", ".gif", animateGif);
    renderButton();
});