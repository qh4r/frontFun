define(function(require){
    console.log('module loaded');
    var Calculator = require('./calc');
    var calc = new Calculator();
    console.log(calc.Equals());
    calc.Add(3);
    calc.Multiply(5)
    console.log(calc.Equals());
    console.log(calc.Equals());
    calc.Add(3);
    calc.Multiply(5)
    calc.Store();
    console.log(calc.Equals());
    calc.Add(4);
    calc.Minus(calc.Whitdraw());
    console.log(calc.Equals());
    calc.Add(8);
    calc.Devide(2);
    console.log(calc.Equals());
});