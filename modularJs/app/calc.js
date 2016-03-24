define(function(){
console.log('calc');
    function Calculator(){
        var count = 0, memory = 0;
        this.Add = function(number){
            count += !isNaN(number) ? Number(number) : 0;
        };
        this.Multiply = function(number){
            count *= !isNaN(number) ? Number(number) : 1;
        };
        this.Minus = function(number){
            count -= !isNaN(number) ? Number(number) : 0;
        };
        this.Devide = function (number) {
            count /= !isNaN(number) ? Number(number) : 1;
        };
        this.Equals = function(){
            return (function(result){
                count = 0;
                return result;
            })(count);
        };
        this.Store = function() {
            (function(result){
                memory = result;
                count = 0;
            })(count)
        };
        this.Whitdraw = function(){
            return (function(mem){
                memory = 0;
                return mem;
            })(memory);
        }
    }

    return Calculator;

});