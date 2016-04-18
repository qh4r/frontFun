define(['domReady', './note'], function (domReady, Note) {

    domReady(function () {
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
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

        var x = new Note();
        console.log(db);
        console.log("dziala");
    });
});
