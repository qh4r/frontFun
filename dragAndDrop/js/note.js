define(function(){
    function Note(container) {



        //NOTE
        var note = document.createElement('div');
        note.className = 'note';

        note.addEventListener('mousedown', function (e) {
            return this.onMouseDown(e);
        }.bind(this), false);

        note.addEventListener('click', function (e) {
            return this.onNoteClick(e);
        }.bind(this), false);

        this.note = note;

        //CLOSE btn
        var close = document.createElement('div');
        close.className = 'close-btn';
        close.addEventListener('click', function (e) {
            return this.close(e);
        }.bind(this), false);

        note.appendChild(close);

        //EDIT btn
        var edit = document.createElement('div');
        edit.className = 'edit';
        edit.setAttribute('content-editable', "");
        edit.addEventListener('keyup', function (e) {
            return this.onKeyUp(e);
        }.bind(this), false);
        note.appendChild(edit);
        this.editField = edit;

        var timestamp = document.createElement('div');
        timestamp.className = 'timestamp';
        timestamp.addEventListener('mousedown', function (e) {
            return this.onMouseDown(e);
        }.bind(this), false);
        note.appendChild(timestamp);
        this.lastModified = timestamp;

        container = container || document.body;
        container.appendChild(this.note);
        return this;
    }

    Note.prototype = {
        get id(){
            // STRING IN OBIEKT ZWRACA TRUE JESLI ISTNIEJE TAKIE POLE
            if(!("_id" in this)){
                this._id = 0;
            }
            return this._id;
        },
        set id(val){
            this._id = val;
        },
        get text(){
            return this.editField.innerHTML;
        },
        set text(val){
            this.editField.innerHTML = val;
        },
        get timestamp(){
            if(!("_timestamp" in this)){
                this._timestamp = 0;
            }
            return this._timestamp;
        },
        set timestamp(val){
            if(this._timestamp === val){
                return;
            }
            this._timestamp  = val;
            var date = new Date(Number(val));
            this.lastModified.textContent = date;
        },
        get left(){
            return this.note.style.left;
        },
        set left(val){
            this.note.style.left = val;
        },
        get top(){
            return this.note.style.top;
        },
        set top(val){
            this.note.style.top = val;
        },
        get zIndex(){
            return this.note.style.zIndex;
        },
        set zIndex(val){
            this.note.style.zIndex = val;
        },
        onMouseDown: function onMouseDown(e) {

        },
        onNoteClick: function onNoteClick(e) {
            console.log(e)
        },
        onKeyUp: function onKeyUp(e) {

        },
        close: function close(e) {

        }
    };

    return Note;
});