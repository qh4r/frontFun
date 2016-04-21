define(['./note'], function(Note){

    var AddButton = function(context, db, left, top){
        this.button = document.createElement('button');
        this.button.className = 'new-note-btn';
        this.button.textContent = "Dodaj Nowy"
        this.button.addEventListener('mousedown', function(e){
            this.onClick(e);
        }.bind(this), false);
        this.button.addEventListener('blur',function(e){
            this.remove();
        }.bind(this));

        this.db = db;
        this.context = context;
        this.left = left +'px';
        this.top = top +'px';
        this.zIndex = 10000;
        this.context.appendChild(this.button);
        this.button.focus();
    };


    AddButton.prototype = {
        onClick: (function(){
            var _notes = [];
            return function onClick(e){
                _notes.push(new Note(this.context, this.db, this.left, this.top));
            };
        })(),
        remove: function remove(){
            this.context.removeChild(this.button);
            delete this;
        },
        set left(val){
            this.button.style.left = val;
        },
        get left() {
            return this.button.style.left;
        },
        set top(val){
            this.button.style.top = val;
        },
        get top() {
            return this.button.style.top;
        },
        set zIndex(val){
            this.button.style.zIndex = val;
        },
        get zIndex() {
            return this.button.style.zIndex;
        },
        set context(val){
            this._context = val;
        },
        get context() {
            return this._context;
        },
        set db(val){
            this._db  = val;
        },
        get db() {
            return this._db;
        }
    }

    return AddButton;
});