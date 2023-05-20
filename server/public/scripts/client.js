$(document).ready(onReady);

 // listen for form submit event
function onReady() {
    console.log('js')
    $('#add-button').on('click',addToDo )
    getToDoList();
    
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
        console.log('AJAX GET Complete')
    }).catch(function(error){
        console.log('Stop There Is Error');
    })

    };