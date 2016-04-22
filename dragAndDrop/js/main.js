define(['domReady', './addButton', './note'], function (domReady, AddButton, Note) {

    domReady(function () {
        var db = (function (window) {
            if (window.openDatabase) {
                var db = window.openDatabase("noteTest2", "1.0", "notes test db one", 10 * 1024 * 1024,
                    databaseOpen);
                if (!db) {
                    throw new Error("db not accessible");
                }
                return db;
            } else {
                throw new Error("db not supported");
            }

            function databaseOpen(version) {
                console.log('db -> ', version);
                //gets called only during first creation of db version?
            }
        })(window);
        //var notes = (function(container ,db){
        //    var notes = [];
        //    var newNoteButton = document.getElementById("new-note-btn");
        //    newNoteButton.addEventListener('click', function(){
        //        notes.push(new Note(container, db));
        //    });
        //    return notes;
        //})(document.body, db);

        document.addEventListener('contextmenu', function(e){
            e.preventDefault();
            var button = new AddButton(document.body, db, e.x, e.y);
        })
    });

    //function loaded() {
    //    db.transaction(function(tx){
    //        tx.
    //    })
    //}
});