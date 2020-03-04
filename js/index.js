'use strict';

let state = {
    location: '',
    distance: '',
    price: '',
    categories: '',
    potential: '',
    currRes: '',
    saved: []
}

$(".btn").mouseup(function () {
    $(this).blur();
})

// Update location state
let userLocation = document.querySelector('#location');
userLocation.addEventListener('input', function () {
    state.location = userLocation.value;
});

// Update distance state
let userDistance = document.querySelector('#distance');
userDistance.addEventListener('input', function () {
    state.distance = userDistance.value;
})

// Update price state
$('#radio-box').change(function () {
    state.price = $("input[name='price']:checked").val();
});

// Update categories state
let checkbox = document.querySelector('#checkbox')
checkbox.addEventListener('change', () => {
    let categories = [];
    $.each($("input[name='category']:checked"), function () {
        categories.push($(this).val());
    });
    let foods = categories.join();
    state.categories = foods;
})

// Hide form and show restaurant result
let submit = document.querySelector('#submit-form');
submit.addEventListener('click', function () {
    if (validateForm()) {
        document.querySelector('#search-result').removeAttribute('hidden');
        document.querySelector('form').setAttribute('hidden', true);
        update();
    }
});

// Hide restaurant result and show form
let back = document.querySelector('#back-btn');
back.addEventListener('click', function () {
    document.querySelector('form').removeAttribute('hidden');
    document.querySelector('#search-result').setAttribute('hidden', true);
});

// Generate another relevant restaurant
let next = document.querySelector('#next-btn');
next.addEventListener('click', function () {
    populate();
});

// Grab relevant restaurants from Yelp API based on user input
function update() {
    let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" +
        "location=" + state.location + "&" +
        "categories=" + state.categories + "&" +
        "price" + state.price + "&" +
        "radius=" + state.distance + "&" +
        "open_now=true";


    $.ajax({
        url: url,
        headers: {
            'Authorization': 'Bearer t06gFAbHO9nj2IKfhNxYZ8fbNhPiTTEJqHJQvc8-W0T_6BvTY70psltgQMNSIdv0eJYzGwwBV3Uqm4jzssnJVECrvRCOxMaxbkC42NvYQ-pz_tdCCk2-Vm0mKoVLXnYx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            state.potential = data.businesses;
            populate();
        }
    });
}

// Populate generated restaurant information
function populate() {
    let randomRestaurant = (state.potential)[Math.floor(Math.random() * (state.potential).length)];
    state.currRes = randomRestaurant;
    
    let resName = document.querySelector('#name');
    resName.textContent = randomRestaurant.name;

    let resLocation = document.querySelector('#address');
    let address = randomRestaurant.location.display_address;
    resLocation.textContent = address.join(' ');

    let resRating = document.querySelector('#rating');
    resRating.textContent = randomRestaurant.rating;

    let resPrice = document.querySelector('#price');
    resPrice.textContent = randomRestaurant.price;

    let resURL = document.querySelector('#more-info');
    resURL.setAttribute('href', randomRestaurant.url);

    let resImage = document.querySelector('#image');
    resImage.setAttribute('src', randomRestaurant.image_url);
}

// Validate form
function validateForm() {
    if (state.location == "") {
        alert("Location must be filled out");
        return false;
    }

    if (state.price == "") {
        alert("A price must be selected");
        return false;
    }

    if (state.categories == "") {
        alert("At least one category must be selected");
    }

    return true;
}

// Update saved restaurants state
let save = document.querySelector('#save-btn');
save.addEventListener('click', function () {  
    state.saved[(state.saved).length] = state.currRes;
    document.querySelector('#tempMessage').setAttribute('hidden', true);
    renderSaved();
});

// Render saved restaurants
function renderSaved() {
    let div = document.querySelector('#saved');
    div.textContent = '';

    let saved = state.saved;
    for (let i = 0; i < saved.length; i++) {
        var a = document.createElement('a');
        var linkText = document.createTextNode(saved[i].name);
        a.appendChild(linkText);
        a.href = saved[i].url;
        a.target = "_blank";
        a.classList.add("saved-links");

        div.appendChild(a);
    }

    
}