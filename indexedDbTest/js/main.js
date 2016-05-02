define(['domReady', 'bootstrap'], function (domReady) {
    domReady(function () {
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        var db;
        var request = window.indexedDB.open('customers', 8);

        request.onupgradeneeded = function (e) {
            var objectStore;
            db = e.target.result;
            console.log(db)
            if (!db.objectStoreNames.contains('customers')) {
            objectStore = db.createObjectStore('customers', {keyPath: "id", autoIncrement: true});
                // objectStore.createIndex('names', 'name', {uniquer: false});
                objectStore.createIndex('names', 'name', {unique: false});
            }

        };

        request.onsuccess = function (e) {
            console.log('polaczono', e);
            db = e.target.result;
            showCustomers(db);
        };
        request.onerror = function (err) {
            console.log('blad: ', err);
        };

        $('#new-customer-form').on('submit', function (e) {
            e.preventDefault();
            addCustomer(db);
        });

        $('#delete-customers').on('click', function(){
            window.indexedDB.deleteDatabase('customers');
            window.location.href = 'index.html';
        });
        console.log("dziala");
    });

    var controls = {
        nameField: $('#customerName'),
        surnameField: $('#customerSurname'),
        emailField: $('#customerMail'),
        addAlert: $('#add-alert'),
        customersList: $('#customers-list')
    };

    function addCustomer(db) {
        var newCustomer = {
            name: controls.nameField.val(),
            surname: controls.surnameField.val(),
            email: controls.emailField.val(),
        };
        var transaction = db.transaction(['customers'], 'readwrite');
        var store = transaction.objectStore('customers');
        
        var request = store.add(newCustomer);
        
        request.onsuccess = function(e){
            //TODO remove this timeout (for now without it data won't persist)
            setTimeout(function(){
                window.location.href = 'index.html';
            }, 500);

        };

        request.onerror = function(err){
            console.log('Error: ', err);
            controls.addAlert.addClass('visible');
            setTimeout(function(){
                controls.addAlert.removeClass('visible');
            }, 3000);
            console.log('end err')
        }
    }

    function showCustomers(db){
        window.removeCustomer = function removeCustomer(id){
            console.log(id);
            var transaction = db.transaction(['customers'], "readwrite");
            var store = transaction.objectStore("customers");

            var req = store.delete(id);

            req.onsuccess = function(){
                $('#row'+id).remove();
            };

            req.onerror = function(err){
                console.log('error -> ', err)
            }
        }

        var transaction = db.transaction(['customers'], 'readonly');
        var store = transaction.objectStore('customers');
        var storeIndex = store.index('names');

        var output = '';
        console.log('out -> ', output);

        storeIndex.openCursor().onsuccess = function(e){
            var cursor = e.target.result;
            console.log(cursor);
            var rowId = 'row'+cursor.value.id;
            if(cursor) {
                output += "<tr id='"+rowId+"'>" +
                        "<td>" + cursor.value.id + "</td>" +
                        "<td><span>" + cursor.value.name + "</span></td>" +
                        "<td><span>" + cursor.value.surname + "</span></td>" +
                        "<td>" + cursor.value.email + "</td>" +
                        "<td>" + "<a onclick='removeCustomer("+cursor.value.id+")'>USUN</a>" + "</td>" +
                    "</tr>";
                cursor.continue();
            }
            console.log('out -> ', output);
            controls.customersList.html(output);
        }

    }

});
