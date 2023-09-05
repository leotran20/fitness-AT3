$(document).ready(function () {

    $.get('/html/header.html', function (data) {
        $('main').before(data);
    });
    $.get('/html/footer.html', function (data) {
        $('main').after(data);
    });

    // use setTimeOut to delay adding the function 1s until header and footer completely appended
    setTimeout(function () {
        $('.overlay').click(function () {
            $('#menu-toggle').click();
        });
    }, 1000);

    $('#join-now-button').click(function () {
        window.location.href = '/html/contact.html';
    });

    $('#learn-more-button').click(function () {
        window.location.href = '/html/classes.html';
    });

    $('body').scroll(function () {
        const maxVisibleHeight = 500;
        const steps = 20
        ;
        const fromTop = $('body').scrollTop();       // pixels from top of screen
        if (fromTop <= maxVisibleHeight) {
            if (fromTop > 50) {// start to fade from 50px
                $('.background-ambient').css({opacity: fromTop / maxVisibleHeight});
            }

            // set filter: blur value go up 1px every 25 pixels.
            const blurValue = Math.round(fromTop / (maxVisibleHeight / steps));
            $('#contact .background-video').css({filter: `blur(${blurValue}px)`});
        }
    });

    const helpLink = $('#helpLink');
    const helpModal = $('#helpModal');
    const innerVideo = $('#helpModal > video');

    // the purpose of using this flag is to not flick the modal on/off rapidly, ensure the video lasts at lest 0.5s
    let isDismissible = false;
    helpLink.hover(function () {
        helpModal.css({visibility: 'visible'});
        innerVideo.css({transform: 'scale(1)'});
    }, function () {
        isDismissible = false;
        setTimeout(() => {
            // set dismissible after 1s after the modal appears
            isDismissible = true;
        }, 500);
    });

    // detect if pointer moved away from the link
    helpModal.mousemove(function () {

        if (isDismissible) {
            innerVideo.removeAttr('style');

            setTimeout(() => {
                helpModal.removeAttr('style');
            }, 100)
        }
    });

    $('form').submit(function () {
        alert('Thank you for reaching out to us. Your message has been successfully sent, and we will respond as soon as possible.');
        $('form').trigger('reset');
        return false;
    });

});

