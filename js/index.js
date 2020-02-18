'use strict';

let state = {
    location: '',
    distance: '',
    price: '',
    categories: ''
}

// function grabFormInfo() { 
//     $('submit-form').click(function(){
//         let location = $('location').val();
//         console.log(location);
//    });
// }

let submit = document.querySelector('#submit-form');
submit.addEventListener('click', function() {
    state.location = document.querySelector('#location').value;
    state.price = document.querySelector('input[name="price"]:checked').value;
    state.distance = document.querySelector('#distance').value;
    
    let categories = [];
    $.each($("input[name='category']:checked"), function(){
        categories.push($(this).val());
    });

    state.categories = categories;

    console.log(state.location);
    console.log(state.price);
    console.log(state.distance);
    console.log(state.categories);
});

// let locationInput = document.querySelector('#location');
// locationInput.addEventListener('input', function() {
//     state.location = locationInput.value;

//     console.log(state.location);
// });
