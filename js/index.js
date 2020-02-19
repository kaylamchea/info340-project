'use strict';

let state = {
    location: '',
    distance: '',
    price: '',
    categories: '',
    potential: ''
}

// Update location state
let userLocation = document.querySelector('#location');
userLocation.addEventListener('input', function () {
    state.location = userLocation.value;
    // console.log(state.location);
});

// Update distance state
let userDistance = document.querySelector('#distance');
userDistance.addEventListener('input', function () {
    state.distance = userDistance.value;
    // console.log(state.distance);
})

// Update price state
$('#radio-box').change(function () {
    state.price = $("input[name='price']:checked").val();
    // console.log(state.price);
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

    // console.log(state.categories);
})

let submit = document.querySelector('#submit-form');
submit.addEventListener('click', function () {
    document.querySelector('#search-result').removeAttribute('hidden');
    document.querySelector('form').setAttribute('hidden', true);

    update();
});

let back = document.querySelector('#back-btn');
back.addEventListener('click', function () {
    document.querySelector('form').removeAttribute('hidden');
    document.querySelector('#search-result').setAttribute('hidden', true);
});

let next = document.querySelector('#next-btn');
next.addEventListener('click', function () {
    populate();
});

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
            // console.log(state.potential);

            populate();
        }
    });
}

function populate() {
    let randomRestaurant = (state.potential)[Math.floor(Math.random() * (state.potential).length)];
    // console.log(randomRestaurant);

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