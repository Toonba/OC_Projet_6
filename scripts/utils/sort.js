//Get all dropdowns from the doc
const dropdown = document.querySelector(".dropdown");

// get inner elements from each dropdown, with a loop
const select = document.querySelector(".select");
const arrow = document.querySelector(".arrow");
const menu = document.querySelector(".menu");
const options = document.querySelectorAll(".menu li");
const selected = document.querySelector(".selected");

//Event to show dropdown
select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    arrow.classList.toggle("arrow-rotate");
    menu.classList.toggle("menu-open");
    //Hide the option that is already displayed before dropdown open 
    for (let i = 0; i < options.length; i++) {
        if (options[i].textContent == selected.textContent) {
            options[i].style.display = "none";
            //show again option if it has been previously hid
        } else if (options[i].textContent != selected.textContent) {
            options[i].style.display = "block";
        }
    }
});

//Hide dropdown and replace the filter by the option choosed 
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function (e) {
        selected.textContent = options[i].textContent;
        select.classList.remove("select-clicked");
        arrow.classList.remove("arrow-rotate");
        menu.classList.remove("menu-open");
    });
}

// sorting function
function getMediaSorted(array, filter) {
    for (i = 0; i < array.length; i++) {
        switch (filter) {
            case "popularity":
                array.sort(function compare(a, b) {
                    if (a.likes < b.likes) {
                        return 1;
                    } else if (a.likes > b.likes) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                photographerGalery = galeryFactory(array[i]);
                photographerGalery.getPhotographeGaleryDOM();
                break;
            case "date":
                array.sort(function compare(a, b) {
                    if (a.date < b.dat) {
                        return -1;
                    } else if (a.date > b.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                photographerGalery = galeryFactory(array[i]);
                photographerGalery.getPhotographeGaleryDOM();
                break;
            case "title":
                array.sort(function compare(a, b) {
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                photographerGalery = galeryFactory(array[i]);
                photographerGalery.getPhotographeGaleryDOM();
                break;
        }
    }
}
