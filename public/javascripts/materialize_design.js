 /*autocomplete KRAJ*/
$(document).ready(function() {

 $('input.autocomplete').autocomplete({ /*img*/
    data: {
      "Maribor": "images/maribor_grb.png",
      "Ljubljana": "images/ljubljana_grb.jpg",
      "Koper": 'images/koper_grb.gif'
    }
  }).bind('focus', function(){
           if(this.value.length === 0)
               $(this).autocomplete("search"); 
    } );
  
  });
  
  
       
/*SELECT INITIALIZATION*/
$(document).ready(function() {
    $('select').material_select();
  });
         
/*range slider value*/

function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
        }
        
/* date picker */
$(document).ready(function() {
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  });
  /*Scrollable tabs*/ 
  $(document).ready(function(){
    $('ul.tabs').tabs();
  });  
  
  
  /*custom error message*/
  $('[name="email"]').on('invalid', function(e) {
    e.target.setCustomValidity("This is a custom error message for email");
});       



  /*main page corousel*/  
  $(document).ready(function() {      
  $('.carousel.carousel-slider').carousel({full_width: true});      
    });          
  /*fullscreen slider*/
    $(document).ready(function(){
      $('.slider').slider({full_width: true});
       $('.slider').slider({full_height: true});
    });
        
/*side navigation*/
 $(document).ready(function(){
    $(".button-collapse").sideNav();       
 });
 


/*dropdown index autocomplete*/

 $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );


 $(document).ready(function(){
  
    $('.autocomplete-content.dropdown-content').appendTo('#kraj_autocomplete_dropdown');

    
 });



 /* bounce index welcome text

            $("#welcome_text").hover(function(){
               $("#welcome_text").effect( "bounce", {times:1}, 1000 );
   });
*/
