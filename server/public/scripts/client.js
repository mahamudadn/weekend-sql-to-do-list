$(document).ready(onReady);

// This function is called when the document is ready
function onReady() {
    console.log('js');

// Fetch the to-do list from the server
    getToDoList();
// Bind the addToDo function to the click event of the "Add" button
    $('#add-button').on('click',addToDo )
// Bind the deleteTask function to the click event of the "Delete" buttons
    $('#viewToDo').on('click', '.delete-btn', deleteTask)
// Bind the updateTask function to the click event of the "Complete" buttons
    $('#viewToDo').on('click', '.complete-btn', updateTask)
    
}

// This function adds a new task to the to-do list
function addToDo() {
// event.preventDefault();
    console.log('AddToDo Working');
// Gets the new task from the input field
    let addNew = $('#to-Do').val();
// Sends a POST request to the server to add the task
    $.ajax({
        type:'POST',
        url:'/listItems',
        data:{task: addNew}
    }).then(function(response){
 // Refresh the to-do list after the task is added
    getToDoList();
        console.log(response)
    }).catch(function(err){
        console.log(err);
    })

    
};
// This function fetches the to-do list from the server
   function getToDoList() {
    console.log('Hello We have something to do');
 // Send a GET request to the server to fetch the list of tasks
    $.ajax({
        method:'GET',
        url:'/listItems',
    }).then(function(response){
        console.log('AJAX GET Complete');
 // Render the fetched tasks to the DOM
        renderToDom(response);
    }).catch(function(error){
        console.log('Stop! There Is Error');
    })

    };

// This function deletes a task from the to-do list
function deleteTask(event){
 event.preventDefault();
 // Get the task ID from the data attribute of the closest table row
 const taskToDelete = $(this).closest("tr").data("id");
 console.log(`Clicked', ${taskToDelete}`);
 // Send a DELETE request to the server to delete the task

$.ajax({
    method: "DELETE",
    url: `/listItems/${taskToDelete}`,
})
    .then(function (response) {
     console.log('YESSSSS!!!!!!!')
 // Refresh the to-do list after the task is deleted
     getToDoList();
  })
    .catch(function (error) {
     console.log("error", error);
  });


}

// This function marks a task as complete in the to-do list

function updateTask() {
    const taskToComplete = $(this).closest("tr").data("id");
    console.log('clicked');
    $.ajax({
      method: "PUT",
      url: `/listItems/${taskToComplete}`,
    })
      .then(function (response) {
 // Refresh the to-do list after the task is updated
        getToDoList();
      })
      .catch(function (error) {
        console.log("error", error);
      });
  
  }
// This function renders the tasks to the DOM
    function renderToDom(arrays) {
 // Clears the existing to-do list
        $('#viewToDo').empty();
        $('#to-Do').val('');
        console.log(arrays);
// loops over the array
        for (let array of arrays ){
            $('#viewToDo').append(`

            
            <tr id=${array.id} class="addToDo" data-id =${array.id}>
            
            <td class="add-New-To">${array.todo} </td>
            <td> <button class="delete-btn">Delete</button></td>
            <td class="complete"><button class="complete-btn">Complete</button></td>
            
            </tr>
            
            
            `)
// changes the background-color when ever a task is complete.     
            if(array.complete === true){
                $(`#${array.id}`).css("background-color", "lightgreen" );
                
            }
        }


        
    }