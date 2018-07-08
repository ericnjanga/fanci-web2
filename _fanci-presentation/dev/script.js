

console.log($);

$(document).ready(()=>{

  // $('body').on('click', '[href^="#"]', function(event){
  //   event.preventDefault();
  //   let val = $(this).attr('href').replace('#', '');

  //   console.log(`${val}`);
    
  //   document.querySelector(`[name="${val}"]`).scrollIntoView({ 
  //     behavior: 'smooth' 
  //   });


  // });





  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('.carousel-control-next, .carousel-control-prev')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);

      // activate current link
      $('.navbar-light .navbar-nav .active').removeClass('active');
      $(this).parent('li').addClass('active');

      // Close mobile nav
      if( $(window).width() <= 992 ) {

        window.setTimeout(function(){
          $('.navbar-toggler').trigger('click');
        }, 200);

      }
      

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });







  // $('[href$="#"]').click



  // jQuery [attribute$=value]



  // // Smooth scroll
  // $('a[href*="#"]')
  // // Remove links that don't actually link to anything
  // .not('[href="#"]')
  // .not('[href="#0"]')
  // .click(function(event) {
  //   // On-page links
  //   if (
  //     location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
  //     && 
  //     location.hostname == this.hostname
  //   ) {
  //     // Figure out element to scroll to
  //     var target = $(this.hash);
  //     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  //     // Does a scroll target exist?
  //     if (target.length) {
  //       // Only prevent default if animation is actually gonna happen
  //       event.preventDefault();
  //       $('html, body').animate({
  //         scrollTop: target.offset().top
  //       }, 1000, function() {
  //         // Callback after animation
  //         // Must change focus!
  //         var $target = $(target);
  //         $target.focus();
  //         if ($target.is(":focus")) { // Checking if the target was focused
  //           return false;
  //         } else {
  //           $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
  //           $target.focus(); // Set focus again
  //         };
  //       });
  //     }
  //   }
  // });
});