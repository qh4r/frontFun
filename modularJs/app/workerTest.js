//DIFFERENT WAY OF REQUIREING
define(['./calc', './worker'], function(Calculator, Worker){
    console.log('worker test');
    var worker1 = new Worker('Krzyś', new Calculator());
    var worker2 = new Worker('Staś');
    console.log('first result', worker1.performCalculations('2+5+3+2+53-23+21'));
    worker2.performCalculations('23+32+32');
    console.log('second result', worker1.performCalculations('2+5*32+2+21/100-23+21'));
});