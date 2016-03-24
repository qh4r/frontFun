/**
 * Created by qh4r on 24.03.2016.
 */
define(function(require){
    console.log('test jquery');
    //JQUUERY LOADS GLOBALLY ANYWAY
    require('jquery');
    $(function(){
        $('body').prepend($('<h1>loaded jquery</h1>'));
    })
});
