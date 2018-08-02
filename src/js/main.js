//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/popper.js/dist/umd/popper.js
//= ../../bower_components/bootstrap-offcanvas/dist/js/bootstrap.offcanvas.js
//= ../../node_modules/bootstrap/js/dist/util.js
//= ../../node_modules/bootstrap/js/dist/collapse.js
//= ../../node_modules/bootstrap/js/dist/dropdown.js
//= ../../bower_components/swiper/dist/js/swiper.js

$(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazy: true,
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        grabCursor: true,

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2000,
        },

        // Default parameters
        slidesPerView: 3,
        spaceBetween: 30,
        // Responsive breakpoints
        breakpoints: {
            // when window width is <= 576px
            576: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is <= 920px
            920: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is <= 960px
            960: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is <= 1670px
            1670: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is <= 1920px
            1920: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

});


