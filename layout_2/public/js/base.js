// Section Banner

let banner = document.querySelectorAll('.banner');

banner.forEach(function (item){
    let prevImageButton = item.querySelector('.prev-image');
    let nextImageButton = item.querySelector('.next-image');
    let images = item.querySelectorAll('.banner-image img');
    let currentActiveImage = item.querySelector('.banner-image img[class*="active"]');
    let lastActiveImage;
    let activeImageKey = 0;
    let imagesLength = images.length - 1;

    if ((currentActiveImage === null || currentActiveImage.length === 0) && images.length > 0){
        images[0].classList.add('active');
    }else{
        images.forEach(function (image, key){
            if (image.classList.contains('.active')){
                activeImageKey = key;
                return null;
            }
        });
    }

    if (images.length > 0){
        prevImageButton.addEventListener('click', function (){
            lastActiveImage = activeImageKey;
            activeImageKey = activeImageKey < 1 ? imagesLength : activeImageKey - 1;
            currentActiveImage = activeImageKey;
            changeCurrentActiveImage(images, lastActiveImage, currentActiveImage);
        });

        nextImageButton.addEventListener('click', function (){
            lastActiveImage = activeImageKey;
            activeImageKey = activeImageKey < imagesLength ? activeImageKey + 1 : 0;
            currentActiveImage = activeImageKey;
            changeCurrentActiveImage(images, lastActiveImage, currentActiveImage);
        });
    }
});

function changeCurrentActiveImage(images, lastImageKey, currentImageKey) {

    images[lastImageKey].classList.add('prepare-rm-change');

    setTimeout(function () {
        images[lastImageKey].classList.remove('active');
        images[currentImageKey].classList.add('prepare-add-change');
        images[currentImageKey].classList.add('active');
        setTimeout(function (){return images[lastImageKey].classList.remove('prepare-rm-change')}, 500);
        setTimeout(function (){return images[currentImageKey].classList.remove('prepare-add-change')}, 500);
    }, 500)

}

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
