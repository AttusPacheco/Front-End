// Section Banner

const BANNERS = document.querySelectorAll('.banner');

BANNERS.forEach(function (item){
    let images = item.querySelectorAll('.banner-image img');

    let banner = {
        'prevImageButton': item.querySelector('.prev-image'),
        'nextImageButton': item.querySelector('.next-image'),
        'images': images,
        'currentActiveImage': item.querySelector('.banner-image img[class*="active"]'),
        'timer': 5000,
        'nextImageTimer': 0,
        'lastActiveImage': 0,
        'activeImageKey': 0,
        'imagesLength': images.length - 1,
    }

    banner.nextImageTimer = setTimer();

    if ((banner.currentActiveImage === null || banner.currentActiveImage.length === 0) && images.length > 0){
        banner.images[0].classList.add('active');
    }else{
        banner.images.forEach(function (image, key){
            if (image.classList.contains('.active')){
                banner.activeImageKey = key;
                return null;
            }
        });
    }

    if (banner.images.length > 0){
        banner.prevImageButton.addEventListener('click', function (){
            banner.lastActiveImage = banner.activeImageKey;
            banner.activeImageKey = banner.activeImageKey < 1 ? banner.imagesLength : banner.activeImageKey - 1;
            banner.currentActiveImage = banner.activeImageKey;
            changeCurrentActiveImage();
        });

        banner.nextImageButton.addEventListener('click', function (){
            banner.lastActiveImage = banner.activeImageKey;
            banner.activeImageKey = banner.activeImageKey < banner.imagesLength ? banner.activeImageKey + 1 : 0;
            banner.currentActiveImage = banner.activeImageKey;
            changeCurrentActiveImage();
        });

    }

    function changeCurrentActiveImage() {
        clearTimeout(banner.nextImageTimer);

        setTimeout(function () {
            banner.images[banner.lastActiveImage].classList.remove('active');
            banner.images[banner.currentActiveImage].classList.add('active');
        }, 500)

        banner.nextImageTimer = setTimer();
    }

    function setTimer() {
        return setTimeout(function () {
            return banner.nextImageButton.click();
        }, banner.timer);
    }

});

// Section Product Presentation
let productPresentation = document.querySelectorAll('.product-presentation');
let productContent = document.querySelectorAll('.product-content');

function prepareSectionsProductPresentation(){
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

// Run Scripts

document.addEventListener('readystatechange', function (){
    prepareSectionsProductPresentation();
})

window.addEventListener('resize', function (){
    prepareSectionsProductPresentation();
});

window.addEventListener('change', function (){
    prepareSectionsProductPresentation();
});
