$(document).ready(onReady);

 // listen for form submit event
function onReady() {
    console.log('js');

    getToDoList();
    $('#add-button').on('click',addToDo )
    $('#viewToDo').on('click', '.delete-btn', deleteTask)
    $('#viewToDo').on('click', '.complete-btn', updateTask)

    
    
}

function addToDo() {
    // event.preventDefault();
    console.log('AddToDo Working');
    let addNew = $('#to-Do').val();
    $.ajax({
        type:'POST',
        url:'/listItems',
        data:{task: addNew}
    }).then(function(response){
        getToDoList();
        console.log(response)
    }).catch(function(err){
        console.log(err);
    })

    
};

   function getToDoList() {
    console.log('Hello We have something to do');
    $.ajax({
        method:'GET',
        url:'/listItems',
    }).then(function(response){
        console.log('AJAX GET Complete');
        renderToDom(response);
    }).catch(function(error){
        console.log('Stop! There Is Error');
    })

    };

// DELETE

function deleteTask(event){
 event.preventDefault();
 const taskToDelete = $(this).closest("tr").data("id");
 console.log(`Clicked', ${taskToDelete}`);
$.ajax({
    method: "DELETE",
    url: `/listItems/${taskToDelete}`,
})
    .then(function (response) {
     console.log('YESSSSS!!!!!!!')
     getToDoList();
  })
    .catch(function (error) {
     console.log("error", error);
  });


}


//PUT

function updateTask() {
    const taskToComplete = $(this).closest("tr").data("id");
    console.log('clicked');
    $.ajax({
      method: "PUT",
      url: `/listItems/${taskToComplete}`,
    })
      .then(function (response) {
        getToDoList();
      })
      .catch(function (error) {
        console.log("error", error);
      });
  
  }

    function renderToDom(arrays) {
        $('#viewToDo').empty();
        $('#to-Do').val('');
        console.log(arrays);

        for (let array of arrays ){
            $('#viewToDo').append(`

            
            <tr id=${array.id} class="addToDo" data-id =${array.id}>
            
            <td class="add-New-To">${array.todo} </td>
            <td> <button class="delete-btn">Delete</button></td>
            <td class="complete"><button class="complete-btn">Complete</button></td>
            
            </tr>
            
            
            `)
            if(array.complete === true){
                $(`#${array.id}`).css("background-color", "grey" );
                
            }
        }


        
    }