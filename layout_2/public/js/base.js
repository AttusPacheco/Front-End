let productPresentation = document.querySelectorAll('.product-presentation');
let productContent = document.querySelectorAll('.product-content');

document.addEventListener('readystatechange', function (){
    scrollProgressProductPresentation();
})

window.addEventListener('resize', function (){
    scrollProgressProductPresentation();
});

window.addEventListener('change', function (){
    scrollProgressProductPresentation();
});

function scrollProgressProductPresentation(){
    productPresentation.forEach(function (item){
        let backButton = item.querySelector('.scroll-back');
        let nextButton = item.querySelector('.scroll-next');

        if (item.scrollWidth > item.clientWidth){
            item.setAttribute("data-has-progress", "1");
            item.setAttribute("data-progress", "0");

            item.addEventListener('scroll', function (){
                let maxLeftScroll = this.scrollWidth - this.clientWidth;
                let currentLeftScroll = this.scrollLeft;
                let scrollPercentage = (currentLeftScroll / maxLeftScroll) * 100;

                item.setAttribute("data-progress", parseInt(scrollPercentage));
            })
        }else{
            item.setAttribute("data-has-progress", "0");
        }

        backButton.addEventListener('click', function () {
            item.scrollLeft -= 305;
        });

        nextButton.addEventListener('click', function () {
            item.scrollLeft += 305;
        });

    });
}

