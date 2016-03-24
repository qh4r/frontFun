define(function (require) {
    console.log('worker');
    var Worker = function (name, tool) {
        console.log(name + ': I don\'t care bout no calculations order');
        var countingTool = tool,
            eqRegex = /(\d+|[+\-*\/])/g,
            match;

        var consumeSign = (function() {
            var method = 'Add';
            return function (item) {
                console.log(item);
                if (isNaN(item)) {
                    return method = (function(item) {
                        switch (item) {
                            case '+':
                                return 'Add';
                            case '-':
                                return 'Minus';
                            case '/':
                                return 'Divide';
                            case '*':
                                return 'Multiply';
                            default:
                                throw new Error('wrong signs??');
                        }
                    })(item);
                }
                return countingTool[method](Number(item));
            }
        })();

        this.performCalculations = function (equationString) {
            if(!countingTool){
               return console.log(name + ': No proper tool');
            }
            while (match = eqRegex.exec(equationString)) {
                consumeSign(match[0]);
            }
            var result = countingTool.Equals();
            console.log(name + ': I got the result, here u go: '+ result);
            return result
        }
    };

    return Worker
});