$(document).ready(onReady);

 // listen for form submit event
function onReady() {
    console.log('js');

    getToDoList();
    $('#add-button').on('click',addToDo )
    
    
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

    
}

   function getToDoList() {
    console.log('Hello We have something to do');
    $.ajax({
        method:'GET',
        url:'/listItems',
    }).then(function(response){
        console.log('AJAX GET Complete');
        renderToDom(response);
    }).catch(function(error){
        console.log('Stop There Is Error');
    })

    };

    function renderToDom(arrays) {
        $('#to-Do-Body').empty();
        $('#to-Do').val('');

        for (let array of arrays ){
            $('#to-Do-Body').append(`
            <tr class = "addToDo" data-id =${listItems.id}>
            <td class = add-New-To>${listItems.To-Do}</td>
            <td class = add-To-Complete>${listItems.complete}</td>
            <tr>
            `)
        }


        
    }