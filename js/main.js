let btn = $('#back-to-top');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});

function resizeMasonryItem(item) {
    let grid = document.getElementsByClassName("portfolio-layout")[0],
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

    let rowSpan = Math.ceil((item.querySelector('.portfolio-img').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

    item.style.gridRowEnd = 'span '+rowSpan;

    item.querySelector('.portfolio-img').style.height = rowSpan * 10 + "px";
}

function resizeAllMasonryItems() {
    let allItems = document.getElementsByClassName("portfolio-item");

    for (let i = 0; i < allItems.length; i++) {
        resizeMasonryItem(allItems[i]);
    }
}

function waitForImages() {
    let allItems = document.getElementsByClassName("portfolio-item");

    for (let i = 0; i < allItems.length; i++) {
        imagesLoaded( allItems[i], function(instance) {
            let item = instance.elements[0];
            resizeMasonryItem(item);
        });
    }
}

let masonryEvents = ['load', 'resize'];

masonryEvents.forEach( function(event) {
    window.addEventListener(event, resizeAllMasonryItems);
});

waitForImages();