$(document).ready(onReady);

 // listen for form submit event
function onReady() {
    console.log('js');

    getToDoList();
    $('#add-button').on('click',addToDo )
    // $('#viewToDo').on('click', '.delete-btn', deleteTask)

    
    
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

    function renderToDom(arrays) {
        $('#to-Do-Body').empty();
        $('#to-Do').val('');
        console.log(arrays);

        for (let array of arrays ){
            $('#viewToDo').append(`
            
            <tr class="addToDo" data-id =${array.id}>
            
            <td class="add-New-To">${array.todo} </td>
            <td> <button class="delete-btn">❌</button></td>
            <td class="complete"><button class="complete-btn">✅</button></td>
            
            </tr>
            
            
            `)
        }


        
    }