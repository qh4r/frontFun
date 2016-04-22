define(['./note'], function (Note) {

    var AddButton = function (context, db, left, top, notes) {
        this.notes = notes;
        this.button = document.createElement('button');
        this.button.className = 'new-note-btn';
        this.button.textContent = "Dodaj Nowy"
        this.button.addEventListener('mousedown', function (e) {
            this.onClick(e);
        }.bind(this), false);
        this.removeHandler = function (e) {
            this.remove();
        }.bind(this);

        this.button.addEventListener('blur', this.removeHandler);

        this.db = db;
        this.context = context;
        this.left = left + 'px';
        this.top = top + 'px';
        this.zIndex = 10000;
        this.context.appendChild(this.button);
        this.button.focus();
    };

    AddButton.prototype = {
        set notes(val){
          this._notes = val;
        },
        onClick: (function () {
            return function onClick(e) {
                this.button.removeEventListener('blur', this.removeHandler);
                this._notes.push(new Note(this.context, this.db, this.left, this.top));
                this.context.removeChild(this.button);
                delete this;
            };
        })(),
        remove: function remove() {
            this.context.removeChild(this.button);
            delete this;
        },
        set left(val) {
            this.button.style.left = val;
        },
        get left() {
            return this.button.style.left;
        },
        set top(val) {
            this.button.style.top = val;
        },
        get top() {
            return this.button.style.top;
        },
        set zIndex(val) {
            this.button.style.zIndex = val;
        },
        get zIndex() {
            return this.button.style.zIndex;
        },
        set context(val) {
            this._context = val;
        },
        get context() {
            return this._context;
        },
        set db(val) {
            this._db = val;
        },
        get db() {
            return this._db;
        }
    }

    return AddButton;
});