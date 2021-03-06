// Application

function addImageToBackground(items){
    items.forEach(function(item){
        let image = item.querySelector('img');
        let src = image.getAttribute('src');
        image.setAttribute('style', 'display:none;');
        item.setAttribute('style', `background: url(${src});`);
    });
}

//  Slider

const sliders = document.querySelectorAll('.slider');

sliders.forEach(function (item) {
    let clientX = 0;
    let dragProgress = 0;
    let currentClientX = 0;
    let mouseDownClientX = 0;
    let sliderDrag = item.querySelector('.slider-draggable');
    let sliderWidth = sliderDrag.scrollWidth - sliderDrag.clientWidth;

    changeDragProgress(dragProgress);
    addImageToBackground(sliderDrag.querySelectorAll('.product-image a'));

    window.addEventListener('resize', updateSliderWidth)

    item.addEventListener('mousedown', mouseDown);
    item.addEventListener('touchstart', mouseDown, {passive: true});

    item.addEventListener('mouseup', function (){
        item.removeEventListener('mousemove', mouseMove);
    });
    item.addEventListener('mouseleave', function (){
        item.removeEventListener('mousemove', mouseMove);
    });

    item.addEventListener('touchend', function (){
        item.removeEventListener('touchmove', mouseMove);
    });
    item.addEventListener('touchcancel', function (){
        item.removeEventListener('touchmove', mouseMove);
    });

    item.addEventListener('click', function (e){
        if (mouseDownClientX !== currentClientX){
            e.preventDefault();
        }
    });

    function getSliderTrace(){
        let matrix = window.getComputedStyle(sliderDrag).transform;
        let value = matrix.split(',')[4] ?? 0;
        return parseInt(value);
    }

    function changeDragProgress(progress){
        sliderDrag.setAttribute('style', `transform: translateX(${progress}px);`);
    }

    function mouseDown(element){
        clientX = element.clientX ?? element.changedTouches[0].clientX;
        currentClientX = clientX;
        mouseDownClientX = clientX;

        item.addEventListener('mousemove', mouseMove);
        item.addEventListener('touchmove', mouseMove, {passive: true});
    }

    function mouseMove(element){
        currentClientX = element.clientX ?? element.changedTouches[0].clientX;
        let trace = currentClientX - clientX;
        let maxTrace = -(sliderWidth);

        if (trace < 0 && !((getSliderTrace() + trace) < maxTrace)){
            changeDragProgress(getSliderTrace() + trace);
        } else if(trace > 0 && !((trace + getSliderTrace()) > 0)){
            changeDragProgress(trace + getSliderTrace());
        }
        clientX = currentClientX;
    }

    function updateSliderWidth(){
        sliderDrag = item.querySelector('.slider-draggable');
        sliderWidth = sliderDrag.scrollWidth - sliderDrag.clientWidth;
        changeDragProgress(0);
    }
});

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
        banner.images[0].closest('.banner-image').classList.add('active');
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
            banner.images[banner.lastActiveImage].closest('.banner-image').classList.remove('active');
            banner.images[banner.currentActiveImage].closest('.banner-image').classList.add('active');
        }, 500)

        banner.nextImageTimer = setTimer();
    }

    function setTimer() {
        return setTimeout(function () {
            return banner.nextImageButton.click();
        }, banner.timer);
    }

});