/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        // If the page does not include the hero masthead, keep the navbar in the
        // 'shrink' state by default so the header is visible on light backgrounds.
        const hasMasthead = document.body.querySelector('header.masthead') !== null;
        if (!hasMasthead) {
            navbarCollapsible.classList.add('navbar-shrink');
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Build combined titles for each portfolio anchor so the lightbox shows project info
    document.querySelectorAll('a.portfolio-box').forEach(a => {
        // prefer project-info (new), fallback to project-category for old markup
        const nameEl = a.querySelector('.project-name');
        const infoEl = a.querySelector('.project-info') || a.querySelector('.project-category');
        const name = nameEl ? nameEl.textContent.trim() : '';
        const info = infoEl ? infoEl.textContent.trim() : '';
        const title = [name, info].filter(Boolean).join(' — ');
        if (title) {
            a.setAttribute('title', title);
        }
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: 'a.portfolio-box'
    });

});
