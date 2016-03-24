define(function(require){
    require('./workerTest');
    require('./calcTest');
    require('./jqueryTest');
    console.log('module loaded');
    //JQUUERY LOADS GLOBALLY ANYWAY (REQUIRED IN jqueryTest)
    $(function(){
        console.log('asd')
    })
});

//EQUIVALENT
//define(['require', './workerTest', './calcTest', './jqueryTest'], function(require, worker){
//    console.log('module loaded');
//    //JQUUERY LOADS GLOBALLY ANYWAY (REQUIRED IN jqueryTest)
//    $(function(){
//        console.log('asd')
//    })
//});