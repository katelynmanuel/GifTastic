# GifTastic
Assignment Six: GifTastic

### Overview 

In this assignment, I'm utilizing the Giphy API to display related gifs to the user when they click on a button. The user can also add buttons to the existing list with a form. 

### Deployed Project

https://katelynmanuel.github.io/GifTastic/

### Step One

After creating the shell for the HTML page, I create an array to hold the predefined list of animal buttons for the user to click on. I create the button in the next step that will display the animal as a clickable button on the HTML page. 

### Step Two

In this step I create the functionality that would allow the user to add their own button to the list and create an if statement that would let the user know they didn't enter in a valid search term, or that the topic already exists. Otherwise, their animal button would get added to the list. I perform an AJAX request with their new topic added and use the function from the next step to display the gifs on user click.

### Step Three

Next I crete an event listener for button clicks and performing AJAX request to the API to retreive gifs for the default or user-added buttons. I added an if statement that would not display the results if the gif had a rating of R and then created our elements and attributes to hold each of the gifs before prepending them to the HTML page. 

### Step Four

In the last step, I create the function to animate the gifs using the attributes defined in the the previous step. If the state is still, we change the attribute to animated and back again to still on second click. 

