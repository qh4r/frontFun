$(function(){
   $('h2').on('click', function(){
       var thisH2 = $(this);
       console.log('before: ', thisH2.css('background-color'));
       thisH2.css('background-color', '#ff0000');
       console.log('after: ', thisH2.css('background-color'));
   });
});