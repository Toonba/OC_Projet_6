"use strict";
// Get dropdowns from the doc
const dropdown = document.querySelector('.dropdown');
// get inner elements from each dropdown
const select = document.querySelector('.select');
const arrow = document.querySelector('.arrow');
const menu = document.querySelector('.menu');
const options = document.querySelectorAll('.menu li');
const selected = document.querySelector('.selected');
// function to open the dropdown and handle his accessibility
function openDropdown() {
    select.classList.toggle('select-clicked');
    arrow.classList.toggle('arrow-rotate');
    menu.classList.toggle('menu-open');
    dropdown.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
}
// Function to close the dropdown and handle his accessibility
function closeDropdown() {
    select.classList.remove('select-clicked');
    arrow.classList.remove('arrow-rotate');
    menu.classList.remove('menu-open');
    // remove .active from all the option to be able to add it only to the one choosed
    options.forEach((option) => option.classList.remove('active'));
    dropdown.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    select.focus();
}
// Event to show dropdown
select.addEventListener('click', () => {
    openDropdown();
});
select.addEventListener('keydown', (e) => {
    if (e.key === 'Space') {
        openDropdown();
    }
});
// Hide dropdown, sort gallery and replace the filter by the option choosed
options.forEach((element) => {
    element.addEventListener('click', handleClick);
    element.addEventListener('keydown', handleKeyDown);
});
function handleClick() {
    const element = this;
    selected.textContent = element.textContent;
    closeDropdown();
    element.classList.add('active');
    displayGallery(mediaById, element.textContent);
}
function handleKeyDown(e) {
    if (e.key === 'Enter') {
        const element = this;
        selected.textContent = element.textContent;
        closeDropdown();
        element.classList.add('active');
        displayGallery(mediaById, element.textContent);
    }
}
// sorting function
function sortGalery(array, filter) {
    switch (filter) {
        case 'Popularité':
            array.sort((a, b) => {
                if (a.likes < b.likes) {
                    return 1;
                }
                if (a.likes > b.likes) {
                    return -1;
                }
                return 0;
            });
            break;
        case 'Date':
            array.sort((a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'Titre':
            array.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            break;
        default:
            break;
    }
}
