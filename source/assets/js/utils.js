window.goTo = function goTo(hash, correct) {
    correct = (typeof correct !== 'undefined') ?  correct : 0;
    $('html, body').animate({scrollTop: $(hash).offset().top-correct},500,function(){
        window.location.hash = hash;
    });
}

window.isElementInView = function isElementInView(element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
}
window.prettyDate = function prettyDate(time){
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
            
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;
            
    return day_diff == 0 && (
        diff < 60 && "Ara mateix" ||
        diff < 120 && "Fa 1 minut" ||
        diff < 3600 && "Fa " + Math.floor( diff / 60 ) + " minuts" ||
        diff < 7200 && "Fa 1 hora" ||
        diff < 86400 && "Fa " + Math.floor( diff / 3600 ) + " hores") ||
        day_diff == 1 && "Ahir" ||
        day_diff < 7 && "Fa " + day_diff + " dies" ||
        day_diff < 31 && "Fa " + Math.ceil( day_diff / 7 ) + " setmanes";
}