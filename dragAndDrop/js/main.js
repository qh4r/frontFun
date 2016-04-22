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

        function loaded() {
            db.transaction(function (tx) {
                tx.executeSql("SELECT COUNT(*) FROM MyNotes", [], function (result) {
                    loadAllNotes();
                }, function (tx, err) {
                    console.log("ERROR --> ", err.message);
                    tx.executeSql("CREATE TABLE MyNotes (id REAL UNIQUE, note TEXT, timestamp REAL, left TEXT, top TEXT, zindex REAL, color TEXT)",
                        [], function (result) {
                            loadAllNotes();
                        }, function(tx, err){
                            console.log("ERROR --> ", err.message);
                        })
                })
            })
        }

        function loadAllNotes() {
            db.transaction(function (tx) {
                tx.executeSql("SELECT id, note, timestamp, left, top, zindex, color FROM MyNotes",
                    [], function (tx, res) {
                        var notes = [];
                        for (var i = 0; i < res.rows.length; i++) {
                            var row = res.rows.item(i);
                            var note = new Note(document.body, db, row['left'], row['top'], row['zindex'],row['color'], row['id']);
                            note.text = row['note'] || "";
                            note.timestamp = row['timestamp'];
                            notes.push(note);
                        }
                        document.addEventListener('contextmenu', function (e) {
                            e.preventDefault();
                            var button = new AddButton(document.body, db, e.x, e.y, notes);
                        });
                    }, function(tx, err){
                        console.log("ERROR --> ", err.message);
                    })
            })
        }

        loaded();
    });


});