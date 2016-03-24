define(function(require){
    console.log('calcTests');
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
    calc.Minus(calc.Withdraw());
    console.log(calc.Equals());
    calc.Add(8);
    calc.Divide(2);
    console.log(calc.Equals());
})