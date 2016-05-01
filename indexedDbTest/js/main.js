define(['domReady', 'bootstrap'],function(domReady){
    domReady(function(){
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        $('#new-customer-form').on('submit',function (e) {
            e.preventDefault();
        });

        console.log("dziala");
    });
});
