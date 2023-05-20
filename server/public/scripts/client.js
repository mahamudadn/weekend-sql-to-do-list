$(document).ready(onReady);

 // listen for form submit event
function onReady() {
    console.log('js')
    $('#to-do-List').on('click',addToDo )

    
}

function addToDo(event) {
    event.preventDefault();
    console.log('AddToDo Working');

    $.ajax({
        type:'POST',
        url:'/listItems',
        data:newAdd
    }).then(function(response){
        getToDoList();
        console.log(response)
    }).catch(function(err){
        console.log(err);
    })

    
}