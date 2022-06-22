// *********************************************************************************************************
// Code By Daniel R. Obiekwe ( https://madebyraymond.herokuapp.com ) ***************************************
// *********************************************************************************************************

(function($){
    "use strict"

    function whichAnimationEvent(){
        var t,
            el = document.createElement("fakeelement");
      
        var animations = {
          "animation"      : "animationend",
          "OAnimation"     : "oAnimationEnd",
          "MozAnimation"   : "animationend",
          "WebkitAnimation": "webkitAnimationEnd"
        }
      
        for (t in animations){
          if (el.style[t] !== undefined){
            return animations[t];
          }
        }
    }
    
    let animationEvent = whichAnimationEvent();
    
    $(document).on('click', '[data-toggle-sidenav = true]', (e) =>{
        // $(e.currentTarget.getAttribute("data-target")).toggleClass('d-none')
        $('#site-sidebar').toggleClass('show');
    });

    $(document).on('click', '.nav-item.has-dropdown', (e) =>{
        e.preventDefault();
        let targetElementClasses = $(e.currentTarget).attr("class").split(/\s+/);
        // console.log(targetElementClasses);
        $('.nav-item.has-dropdown').removeClass('active');
        targetElementClasses.includes('active') ? $(e.currentTarget).removeClass('active') : $(e.currentTarget).addClass('active');
        // $(e.currentTarget).toggleClass('active');
    });
    
    $(document).on('click', '.accordion-header:not(.creation-accordion-header)', (e) =>{
        // console.log(e.currentTarget.nextElementSibling);
        $(e.currentTarget.nextElementSibling).toggleClass('show');
        $(e.currentTarget).toggleClass('active');
    });
    
    $(document).on('click', '.creation-accordion-header', (e) =>{
        $(e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling).toggleClass('show');
        $(e.target.parentNode.parentNode.parentNode.parentNode).toggleClass('active');
    });

    $(document).on('click', '[data-toggle-visibility]', (e) =>{
        let targetElement = $(e.currentTarget.getAttribute("data-toggle-visibility"));
        let targetElementClasses = targetElement.attr("class").split(/\s+/);
        if ((targetElementClasses.includes('filters-container') || targetElementClasses.includes('student-dropdown-container')) && !targetElementClasses.includes('d-none')) {
            targetElement.addClass('removing');
            targetElement.one(animationEvent, function(event) {
                targetElement.addClass('d-none');
                targetElement.removeClass('removing');
            });
        } else {
            targetElement.toggleClass('d-none');
        }
        
    })

})(jQuery);