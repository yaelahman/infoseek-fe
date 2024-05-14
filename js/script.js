/**
  Toggles the necessary aria- attributes' values on the accordion panels
  and handles to show or hide them.
  @param {HTMLElement} element The tab that acts as the handles.
  @param {Boolean} show Whether to show or hide the accordion panel.
*/
function toggleExpanded(element, show) {
    var target = document.getElementById(element.getAttribute('aria-controls'));

    if (target) {
        element.setAttribute('aria-expanded', show);
        target.setAttribute('aria-hidden', !show);
    }
}

/**
  Attaches event listeners for the accordion open and close click events.
  @param {HTMLElement} accordionContainer The accordion container element.
*/
function setupAccordion(accordionContainer) {
    // Finds any open panels within the container and closes them.
    function closeAllPanels() {
        var openPanels = accordionContainer.querySelectorAll('[aria-expanded=true]');

        for (var i = 0, l = openPanels.length; i < l; i++) {
            toggleExpanded(openPanels[i], false);
        }
    }

    // Set up an event listener on the container so that panels can be added
    // and removed and events do not need to be managed separately.
    accordionContainer.addEventListener('click', function (event) {
        var target = event.target;

        if (target.closest) {
            target = target.closest('[class*="p-accordion__tab"]');
        }

        if (target) {
            var isTargetOpen = target.getAttribute('aria-expanded') === 'true';
            closeAllPanels();

            // Toggle visibility of the target panel.
            toggleExpanded(target, !isTargetOpen);
        }
    });
}

// Setup all accordions on the page.
var accordions = document.querySelectorAll('.p-accordion');

for (var i = 0, l = accordions.length; i < l; i++) {
    setupAccordion(accordions[i]);
}


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
    },
    // autoplay: {
    //     delay: 3000, // Autoplay delay in milliseconds
    //     disableOnInteraction: true, // Allow user interaction to stop autoplay
    // },
    navigation: {
        nextEl: ".swiper-button-next-new",
        prevEl: ".swiper-button-prev-new",
    },

    centeredSlides: true,
    breakpoints: {
        // when window width is <= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // when window width is <= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is <= 992px
        992: {
            slidesPerView: 4,
            spaceBetween: 30
        }
    }
});


window.onscroll = function () {

    // pageYOffset or scrollY
    console.log(window.innerWidth, "INNER")
    console.log(window.pageYOffset)
    if (window.pageYOffset > 900) {
        if (document.getElementById('feature')) {
            document.getElementById('feature').classList.add('swipeIn');
        }
    }

    if (window.pageYOffset > 1500) {
        if (document.getElementById('knowledgeChild')) {
            document.getElementById('knowledgeChild').classList.add('swipeIn');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var textElement = document.getElementById('text-animation');
    var textContent = textElement.textContent.trim(); // Get the text content without leading/trailing spaces
    textElement.textContent = ''; // Clear the text content

    // Type the text content gradually
    var index = 0;
    var typingInterval = setInterval(function () {
        textElement.textContent += textContent[index];
        index++;
        if (index >= textContent.length) {
            clearInterval(typingInterval); // Stop typing animation when text is fully typed
        }
    }, 50); // Adjust typing speed as needed (milliseconds per character)
});
