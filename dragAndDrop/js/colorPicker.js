define(function () {

    var ColorPicker = function (colors, callback) {
        this.picker = document.createElement("ul");
        this.picker.className = "colors";
        //TO SPRAWIA ZE TAB INDEX DAJE SIE FOCUSOWAC
        this.picker.setAttribute('tabindex', 1);
        if (colors && colors.length) {
            colors.forEach(function (color) {
                var ls = document.createElement("li");
                ls.style.backgroundColor = color;
                ls.addEventListener('click', function () {
                    callback(this.style.backgroundColor);
                });
                this.picker.appendChild(ls);
            }.bind(this));
        }
        this.picker.addEventListener('blur', function(){
            this.hide();
        }.bind(this));

        return this;
    };

    ColorPicker.prototype = {
        toggleVisibility: function toggleVisibility() {
            this.picker.className = /show/.test(this.picker.className) ? "colors" : "colors show"
        },
        show: function show() {
            this.picker.className = "colors show"
        },
        hide: function hide() {
            this.picker.className = "colors";
        },
        focus: function focus() {
            this.picker.focus();
        }
    };

    return ColorPicker;
});