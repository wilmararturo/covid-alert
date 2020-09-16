# Using Local Storage to save data

One of the standout features of our covid alert application is to store and display recently searched locations so that users can quickly access the information that is relevant to them.  

In order to accomplish this, we will incoporate the "localStorage" method to save searched data in the user's browser using default browser functionality. 

#### Basic local storage syntax example
$('#test').html("Test");

localStorage.content = $('#test').html();

$('#test').html(localStorage.content);

NOTE: Local storage makes reference to and incorporates html elements in order to display the stored data to the screen.