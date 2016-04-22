define(['./colorPicker'],function(ColorPicker){
    var current = null, highestZ = 0;
    var lastId = 0;

    //STOP PROPAGATION BLOKUJE BUBBLE
    //document.addEventListener("mousedown", function(e){e.stopPropagation(); console.log('body --> ',e)}, true)

    function Note(container, db, left, top, zIndex, color, id) {

        this.db = db;


        highestZ = !zIndex || (highestZ > zIndex) ? highestZ : zIndex;

        if(!isNaN(id)){
            this.id = id;
            if(id >= lastId){
                lastId = id + 1;
            }
        }

        var note = document.createElement('div');
        note.className = 'note';

        note.addEventListener('mousedown', function (e) {
            return this.onMouseDown(e);
        }.bind(this), false);

        note.addEventListener('contextmenu', function(e){
            e.preventDefault();
            e.stopPropagation();
            this.colorPicker.show();
            this.colorPicker.focus();
        }.bind(this), false);

        note.addEventListener('click', function (e) {
            return this.onNoteClick(e);
        }.bind(this), false);



        this.note = note;

        this.left = left;
        this.top = top;
        this.color = color || "#ffeb6e";

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
        edit.setAttribute('contenteditable',false);
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

        this.colorPicker = new ColorPicker(['#ff5463','#9cff79','#7fd6ff', '#ffeb6e', '#b869ff', '#ffa450'],function(color){
            this.updateColor(color)
        }.bind(this));

        this.note.appendChild(this.colorPicker.picker);

        this.container = container || document.body;
        this.container.appendChild(this.note);

        if(id === undefined){
            this.saveAsNew();
        }
        return this;
    }

    Note.prototype = {
        get container(){
            if(!"_container" in this){
                throw new Error("no container object");
            }
            return this._container;
        },
        set container(val){
            this._container = val;
        },
        get db(){
            if(!"_db" in this){
                throw new Error("no db object");
            }
           return this._db;
        },
        set db(val){
            this._db = val;
        },
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
            return this.editField.textContent;
        },
        set text(val){
            this.editField.textContent = val;
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
        get color(){
            return this.note.style.backgroundColor;
        },
        set color(val){
            this.note.style.backgroundColor = val;
        },
        onMouseDown: function onMouseDown(e) {
            current = this;
            this.startX = e.clientX - this.note.offsetLeft;
            this.startY = e.clientY - this.note.offsetTop;
            this.zIndex = ++highestZ;
            if(!("mouseMoveHandler" in this)){
                this.mouseMoveHandler = function(e){
                    return onMouseMove.call(this, e);
                }.bind(this);
                this.mouseUpHandler = function(e){
                    return onMouseUp.call(this, e);
                }.bind(this);
            }
            document.addEventListener("mousemove", this.mouseMoveHandler, true);
            document.addEventListener("mouseup", this.mouseUpHandler, true);
        },
        onNoteClick: function onNoteClick() {
            this.editField.setAttribute("contenteditable", true);
            this.editField.focus();
            getSelection().collapseToEnd();
        },
        onKeyUp: function onKeyUp(e) {
            this.dirty = true;
            this.saveCounter();
        },
        close: function close() {
            this.cancelPendingSave();
            this.db.transaction(function(t){
                t.executeSql("delete from MyNotes where id = ?", [this.id]);
            }.bind(this), function(err){
                console.log("ERROR --> ", err);
            }, function(res) {
                console.log('usunieto ', res);
            });
            this.container.removeChild(this.note);
        },
        cancelPendingSave: function(){
            if(!("_saveTimer" in this)){
                return;
            }
            clearTimeout(this._saveTimer);
            delete this._saveTimer;
        },
        saveCounter: function saveCounter(){
            this.cancelPendingSave();
            this._saveTimer = setTimeout(function(){
                this.save();
            }.bind(this), 1000);
        },
        save: function save(){
            this.cancelPendingSave();
            if("dirty" in this){
                this.timestamp = new Date().getTime();
                delete this.dirty;
            }
            this.db.transaction(function(t){
                t.executeSql("Update MyNotes set note = ?, timestamp = ?, left = ?, top = ?, zindex = ?, color = ? where id = ?",
                    [this.text, this.timestamp, this.left, this.top, this.zIndex, this.color, this.id]);
            }.bind(this), function(err){
                console.log("ERROR --> ", err);
            }, function(res) {
                console.log('zapisano ', res);
            });
        },
        updateColor: function updateColor(newColor){
            this.color = newColor;
            this.saveCounter();
        },
        saveAsNew: function saveAsNew() {
            this.timestamp = new Date().getTime();
            this.db.transaction(function(t){
                t.executeSql("insert into MyNotes (id, note, timestamp, left, top, zindex, color) values(?, ?, ?, ?, ?, ?, ?)",
                    [lastId, this.text, this.timestamp, this.left, this.top, this.zIndex, this.color])
            }.bind(this), function(err) {
                if(err){
                 return console.log('zapisano nowa ', err);
                }
            },function(){
                lastId++;
            });
        }
    };

    function onMouseMove(e) {
        if(this != current){
            return true;
        }
        this.left = e.clientX - this.startX + 'px';
        this.top = e.clientY - this.startY + 'px';
        return false;
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", this.mouseMoveHandler, true);
        document.removeEventListener("mouseup", this.mouseUpHandler, true);

        this.save();
        return false;
    }


    return Note;
});